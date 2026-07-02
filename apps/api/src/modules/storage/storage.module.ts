import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { SupabaseStorageProvider } from './providers/supabase-storage.provider';
import { STORAGE_PROVIDER } from './storage.constants';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';

@Module({
  imports: [AuthModule],
  controllers: [StorageController],
  providers: [
    { provide: STORAGE_PROVIDER, useClass: SupabaseStorageProvider },
    StorageService,
  ],
  exports: [StorageService],
})
export class StorageModule {}
