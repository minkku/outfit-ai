import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { AUTH_PROVIDER } from '../auth.constants';
import type { IAuthProvider } from '../interfaces/auth-provider.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_PROVIDER) private readonly authProvider: IAuthProvider) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const token = this.extractToken(request);

    if (!token) throw new UnauthorizedException();

    const user = await this.authProvider.verifyToken(token);
    (request as FastifyRequest & { user: typeof user }).user = user;

    return true;
  }

  private extractToken(request: FastifyRequest): string | null {
    const auth = request.headers.authorization;
    if (!auth?.startsWith('Bearer ')) return null;
    return auth.slice(7);
  }
}
