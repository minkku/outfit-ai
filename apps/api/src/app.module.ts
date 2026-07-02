import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClosetModule } from './modules/closet/closet.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, ClosetModule],
})
export class AppModule {}
