import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  name?: string;
}
