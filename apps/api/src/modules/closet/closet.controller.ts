import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import type { AuthUser } from '../auth/interfaces/auth-provider.interface';
import { ClosetService } from './closet.service';
import { CreateClosetItemDto } from './dto/create-closet-item.dto';
import { UpdateClosetItemDto } from './dto/update-closet-item.dto';

@UseGuards(JwtAuthGuard)
@Controller('closet')
export class ClosetController {
  constructor(private readonly closetService: ClosetService) {}

  @Get()
  findAll(@CurrentUser() user: AuthUser) {
    return this.closetService.findAll(user.id);
  }

  @Get(':id')
  findOne(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.closetService.findOne(user.id, id);
  }

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateClosetItemDto) {
    return this.closetService.create(user.id, dto);
  }

  @Patch(':id')
  update(@CurrentUser() user: AuthUser, @Param('id') id: string, @Body() dto: UpdateClosetItemDto) {
    return this.closetService.update(user.id, id, dto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.closetService.remove(user.id, id);
  }
}
