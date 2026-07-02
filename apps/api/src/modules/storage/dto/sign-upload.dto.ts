import { IsIn, IsString } from 'class-validator';
import { STORAGE_FOLDERS, type StorageFolder } from '../storage.constants';

export class SignUploadDto {
  @IsString()
  @IsIn(STORAGE_FOLDERS)
  folder!: StorageFolder;
}
