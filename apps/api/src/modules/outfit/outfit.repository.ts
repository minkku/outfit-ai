import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { and, eq, inArray } from 'drizzle-orm';
import { DATABASE } from '../../database/database.constants';
import type { DrizzleDb } from '../../database/database.types';
import { closetItems, outfitItems, outfits } from '../../database/drizzle/schema';
import type { CreateOutfitDto } from './dto/create-outfit.dto';

@Injectable()
export class OutfitRepository {
  constructor(@Inject(DATABASE) private readonly db: DrizzleDb) {}

  findAllByUser(userId: string) {
    return this.db.query.outfits.findMany({
      where: eq(outfits.userId, userId),
      with: {
        items: {
          with: {
            closetItem: {
              with: {
                brand: true,
                colors: { with: { color: true } },
                seasons: { with: { season: true } },
              },
            },
          },
        },
      },
      orderBy: (outfit, { desc }) => [desc(outfit.createdAt)],
    });
  }

  findOne(userId: string, id: string) {
    return this.db.query.outfits.findFirst({
      where: and(eq(outfits.id, id), eq(outfits.userId, userId)),
      with: {
        items: {
          with: {
            closetItem: {
              with: {
                brand: true,
                colors: { with: { color: true } },
                seasons: { with: { season: true } },
              },
            },
          },
        },
      },
    });
  }

  async create(userId: string, dto: CreateOutfitDto) {
    return this.db.transaction(async (tx) => {
      const ownedItems = await tx
        .select({ id: closetItems.id })
        .from(closetItems)
        .where(
          and(
            eq(closetItems.userId, userId),
            inArray(closetItems.id, dto.closetItemIds),
          ),
        );

      if (ownedItems.length !== dto.closetItemIds.length) {
        throw new BadRequestException('유효하지 않은 옷 항목이 포함되어 있습니다');
      }

      const [outfit] = await tx
        .insert(outfits)
        .values({ userId, name: dto.name, note: dto.note })
        .returning();

      await tx.insert(outfitItems).values(
        dto.closetItemIds.map((closetItemId) => ({ outfitId: outfit.id, closetItemId })),
      );

      return this.findOne(userId, outfit.id);
    });
  }

  async remove(id: string) {
    await this.db.delete(outfits).where(eq(outfits.id, id));
  }
}
