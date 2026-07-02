import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DATABASE } from '../../database/database.constants';
import type { DrizzleDb } from '../../database/database.types';
import {
  closetItemColors,
  closetItemSeasons,
  closetItemStyleTags,
  closetItems,
} from '../../database/drizzle/schema';
import type { CreateClosetItemDto } from './dto/create-closet-item.dto';
import type { UpdateClosetItemDto } from './dto/update-closet-item.dto';

@Injectable()
export class ClosetRepository {
  constructor(@Inject(DATABASE) private readonly db: DrizzleDb) {}

  findAllByUser(userId: string) {
    return this.db.query.closetItems.findMany({
      where: eq(closetItems.userId, userId),
      with: {
        brand: true,
        colors: { with: { color: true } },
        seasons: { with: { season: true } },
        styleTags: { with: { styleTag: true } },
      },
      orderBy: (item, { desc }) => [desc(item.createdAt)],
    });
  }

  findOne(userId: string, id: string) {
    return this.db.query.closetItems.findFirst({
      where: and(eq(closetItems.id, id), eq(closetItems.userId, userId)),
      with: {
        brand: true,
        colors: { with: { color: true } },
        seasons: { with: { season: true } },
        styleTags: { with: { styleTag: true } },
      },
    });
  }

  async create(userId: string, dto: CreateClosetItemDto) {
    return this.db.transaction(async (tx) => {
      const [item] = await tx
        .insert(closetItems)
        .values({ userId, imageUrl: dto.imageUrl, category: dto.category, brandId: dto.brandId })
        .returning();

      await this.syncJunctions(tx, item.id, dto);

      return this.findOne(userId, item.id);
    });
  }

  async update(userId: string, id: string, dto: UpdateClosetItemDto) {
    return this.db.transaction(async (tx) => {
      const { colorIds, seasonIds, styleTagIds, ...fields } = dto;

      if (Object.keys(fields).length) {
        await tx.update(closetItems).set(fields).where(eq(closetItems.id, id));
      }

      await this.syncJunctions(tx, id, dto);

      return this.findOne(userId, id);
    });
  }

  async remove(id: string) {
    await this.db.delete(closetItems).where(eq(closetItems.id, id));
  }

  private async syncJunctions(
    tx: Parameters<Parameters<DrizzleDb['transaction']>[0]>[0],
    itemId: string,
    dto: Pick<CreateClosetItemDto, 'colorIds' | 'seasonIds' | 'styleTagIds'>,
  ) {
    if (dto.colorIds !== undefined) {
      await tx.delete(closetItemColors).where(eq(closetItemColors.closetItemId, itemId));
      if (dto.colorIds.length) {
        await tx.insert(closetItemColors).values(
          dto.colorIds.map((colorId) => ({ closetItemId: itemId, colorId })),
        );
      }
    }

    if (dto.seasonIds !== undefined) {
      await tx.delete(closetItemSeasons).where(eq(closetItemSeasons.closetItemId, itemId));
      if (dto.seasonIds.length) {
        await tx.insert(closetItemSeasons).values(
          dto.seasonIds.map((seasonId) => ({ closetItemId: itemId, seasonId })),
        );
      }
    }

    if (dto.styleTagIds !== undefined) {
      await tx.delete(closetItemStyleTags).where(eq(closetItemStyleTags.closetItemId, itemId));
      if (dto.styleTagIds.length) {
        await tx.insert(closetItemStyleTags).values(
          dto.styleTagIds.map((styleTagId) => ({ closetItemId: itemId, styleTagId })),
        );
      }
    }
  }
}
