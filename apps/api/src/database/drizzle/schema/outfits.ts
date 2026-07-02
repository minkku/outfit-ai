import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { closetItems } from './clothing';
import { users } from './users';

export const outfits = pgTable('outfits', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: text('name'),
  note: text('note'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const outfitItems = pgTable('outfit_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  outfitId: uuid('outfit_id')
    .notNull()
    .references(() => outfits.id, { onDelete: 'cascade' }),
  closetItemId: uuid('closet_item_id')
    .notNull()
    .references(() => closetItems.id, { onDelete: 'cascade' }),
});
