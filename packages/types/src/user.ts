export type AuthProvider = 'email' | 'google';

export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  provider: AuthProvider;
  createdAt: string;
}
