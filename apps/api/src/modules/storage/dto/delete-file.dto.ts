import { IsArray, IsString } from 'class-validator';

export class DeleteFileDto {
  @IsArray()
  @IsString({ each: true })
  paths!: string[];
}
