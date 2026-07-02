import { Module } from '@nestjs/common';
import { AUTH_PROVIDER } from './auth.constants';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { SupabaseAuthProvider } from './providers/supabase-auth.provider';

@Module({
  providers: [
    { provide: AUTH_PROVIDER, useClass: SupabaseAuthProvider },
    JwtAuthGuard,
  ],
  exports: [AUTH_PROVIDER, JwtAuthGuard],
})
export class AuthModule {}
