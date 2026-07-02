import { Body, Controller, Delete, HttpCode, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthUser } from '../auth/interfaces/auth-provider.interface';
import { DeleteFileDto } from './dto/delete-file.dto';
import { SignUploadDto } from './dto/sign-upload.dto';
import { StorageService } from './storage.service';

@UseGuards(JwtAuthGuard)
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post('sign')
  getSignedUploadUrl(@CurrentUser() user: AuthUser, @Body() dto: SignUploadDto) {
    return this.storageService.getSignedUploadUrl(user.id, dto.folder);
  }

  @Delete()
  @HttpCode(204)
  delete(@Body() dto: DeleteFileDto) {
    return this.storageService.delete(dto.paths);
  }
}
