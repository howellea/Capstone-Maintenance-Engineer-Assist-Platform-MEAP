export interface UserData {
  _id: string;
  username: string;
  email: string;
  role: 'engineer' | 'technician';
  exp?: number;
  iat?: number;
}
