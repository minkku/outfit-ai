import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateOutfitDto } from './dto/create-outfit.dto';
import { OutfitRepository } from './outfit.repository';

@Injectable()
export class OutfitService {
  constructor(private readonly outfitRepository: OutfitRepository) {}

  findAll(userId: string) {
    return this.outfitRepository.findAllByUser(userId);
  }

  async findOne(userId: string, id: string) {
    const outfit = await this.outfitRepository.findOne(userId, id);
    if (!outfit) throw new NotFoundException('코디를 찾을 수 없습니다');
    return outfit;
  }

  create(userId: string, dto: CreateOutfitDto) {
    return this.outfitRepository.create(userId, dto);
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.outfitRepository.remove(id);
  }
}
