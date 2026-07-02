import { IsArray, IsIn, IsOptional, IsString, IsUUID } from 'class-validator';
import { CLOTHING_CATEGORIES, type ClothingCategory } from '@outfit-ai/types';

export class CreateClosetItemDto {
  @IsString()
  imageUrl!: string;

  @IsIn(CLOTHING_CATEGORIES)
  category!: ClothingCategory;

  @IsUUID()
  @IsOptional()
  brandId?: string;

  @IsUUID('4', { each: true })
  @IsArray()
  @IsOptional()
  colorIds?: string[];

  @IsUUID('4', { each: true })
  @IsArray()
  @IsOptional()
  seasonIds?: string[];

  @IsUUID('4', { each: true })
  @IsArray()
  @IsOptional()
  styleTagIds?: string[];
}
