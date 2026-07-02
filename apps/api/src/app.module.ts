import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { ClosetModule } from './modules/closet/closet.module';
import { OutfitModule } from './modules/outfit/outfit.module';
import { StorageModule } from './modules/storage/storage.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [DatabaseModule, AuthModule, UsersModule, ClosetModule, StorageModule, OutfitModule],
})
export class AppModule {}
