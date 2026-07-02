import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import type { AuthUser, IAuthProvider } from '../interfaces/auth-provider.interface';

@Injectable()
export class SupabaseAuthProvider implements IAuthProvider {
  private readonly secret = process.env.SUPABASE_JWT_SECRET!;

  async verifyToken(token: string): Promise<AuthUser> {
    try {
      const payload = jwt.verify(token, this.secret) as jwt.JwtPayload;
      return {
        id: payload.sub!,
        email: payload.email as string,
      };
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
