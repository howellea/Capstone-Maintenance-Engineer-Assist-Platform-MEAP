import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { UserData } from '../interfaces/UserData';

// Define the shape of your decoded token, extending standard fields
interface ExtendedJwt extends JwtPayload {
  data: UserData; //  Must match UserData interface (including role)
}

class AuthService {
  // Decode token and return full profile (includes role)
  getProfile(): UserData | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded = jwtDecode<ExtendedJwt>(token);
      return decoded.data;
    } catch (err) {
      console.error('Failed to decode token:', err);
      return null;
    }
  }

  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded?.exp && decoded.exp < Date.now() / 1000) {
        return true;
      }
      return false;
    } catch {
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem('id_token') || '';
  }

  login(idToken: string): void {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/dashboard'); // Redirect after login
  }

  logout(): void {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

export default new AuthService();
