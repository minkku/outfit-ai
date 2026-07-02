import { Injectable, NotFoundException } from '@nestjs/common';
import { ClosetRepository } from './closet.repository';
import type { CreateClosetItemDto } from './dto/create-closet-item.dto';
import type { UpdateClosetItemDto } from './dto/update-closet-item.dto';

@Injectable()
export class ClosetService {
  constructor(private readonly closetRepository: ClosetRepository) {}

  findAll(userId: string) {
    return this.closetRepository.findAllByUser(userId);
  }

  async findOne(userId: string, id: string) {
    const item = await this.closetRepository.findOne(userId, id);
    if (!item) throw new NotFoundException('Closet item not found');
    return item;
  }

  create(userId: string, dto: CreateClosetItemDto) {
    return this.closetRepository.create(userId, dto);
  }

  async update(userId: string, id: string, dto: UpdateClosetItemDto) {
    await this.findOne(userId, id);
    return this.closetRepository.update(userId, id, dto);
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.closetRepository.remove(id);
  }
}
