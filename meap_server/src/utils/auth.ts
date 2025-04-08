import jwt from 'jsonwebtoken';
import { GraphQLError } from 'graphql';
import dotenv from 'dotenv';
dotenv.config();

// ⬅️ This is what Apollo Server 4 expects for `context`

export const authenticateToken = ({ req }: any) => {
  let token = req.body.token || req.query.token || req.headers.authorization;

  if (req.headers.authorization) {
    token = token.split(' ').pop().trim();
  }
  console.log('Token header:', req.headers.authorization);
  if (!token) {
    return { user: null }; // ✅ Apollo expects context object
  }

  try {
    const { data }: any = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY || '',
      { maxAge: '2h' }
    );
    return { user: data }; // ✅ context.user available in resolvers
  } catch (err) {
    console.log('Invalid token');
    return { user: null };
  }
};

// Sign the token with embedded user payload
export const signToken = (
  username: string,
  email: string,
  _id: unknown,
  role: string
) => {
  const payload = { username, email, _id, role };
  const secretKey = process.env.JWT_SECRET_KEY || 'secret';
  return jwt.sign({ data: payload }, secretKey, { expiresIn: '2h' });
};

// Custom GraphQL authentication error
export class AuthenticationError extends GraphQLError {
  constructor(message: string) {
    super(message, {
      extensions: {
        code: 'UNAUTHENTICATED',
      },
    });
    Object.defineProperty(this, 'name', { value: 'AuthenticationError' });
  }
};
