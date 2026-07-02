import { Inject, Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import type { IStorageProvider } from './interfaces/storage-provider.interface';
import { STORAGE_PROVIDER, type StorageFolder } from './storage.constants';

@Injectable()
export class StorageService {
  constructor(@Inject(STORAGE_PROVIDER) private readonly provider: IStorageProvider) {}

  getSignedUploadUrl(userId: string, folder: StorageFolder) {
    const path = `${folder}/${userId}/${randomUUID()}`;
    return this.provider.getSignedUploadUrl(path);
  }

  getPublicUrl(path: string) {
    return this.provider.getPublicUrl(path);
  }

  delete(paths: string[]) {
    return this.provider.delete(paths);
  }
}
