import { IsArray, IsIn, IsOptional, IsString, IsUUID } from 'class-validator';
import { CLOTHING_CATEGORIES, type ClothingCategory } from '@outfit-ai/types';

export class UpdateClosetItemDto {
  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsIn(CLOTHING_CATEGORIES)
  @IsOptional()
  category?: ClothingCategory;

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
