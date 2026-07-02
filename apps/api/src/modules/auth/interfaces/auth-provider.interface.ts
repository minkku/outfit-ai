export interface AuthUser {
  id: string;
  email: string;
}

export interface IAuthProvider {
  verifyToken(token: string): Promise<AuthUser>;
}
