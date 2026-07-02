import { pgEnum, pgTable, primaryKey, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users';

export const clothingCategoryEnum = pgEnum('clothing_category', [
  'top',
  'bottom',
  'outer',
  'shoes',
  'accessory',
]);

export const seasonNameEnum = pgEnum('season_name', [
  'spring',
  'summer',
  'fall',
  'winter',
]);

export const brands = pgTable('brands', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
});

export const colors = pgTable('colors', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  hexCode: text('hex_code').notNull(),
});

export const seasons = pgTable('seasons', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: seasonNameEnum('name').notNull().unique(),
});

export const styleTags = pgTable('style_tags', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),
});

export const closetItems = pgTable('closet_items', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  brandId: uuid('brand_id').references(() => brands.id, { onDelete: 'set null' }),
  imageUrl: text('image_url').notNull(),
  category: clothingCategoryEnum('category').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export const closetItemColors = pgTable(
  'closet_item_colors',
  {
    closetItemId: uuid('closet_item_id')
      .notNull()
      .references(() => closetItems.id, { onDelete: 'cascade' }),
    colorId: uuid('color_id')
      .notNull()
      .references(() => colors.id, { onDelete: 'cascade' }),
  },
  (t) => [primaryKey({ columns: [t.closetItemId, t.colorId] })],
);

export const closetItemSeasons = pgTable(
  'closet_item_seasons',
  {
    closetItemId: uuid('closet_item_id')
      .notNull()
      .references(() => closetItems.id, { onDelete: 'cascade' }),
    seasonId: uuid('season_id')
      .notNull()
      .references(() => seasons.id, { onDelete: 'cascade' }),
  },
  (t) => [primaryKey({ columns: [t.closetItemId, t.seasonId] })],
);

export const closetItemStyleTags = pgTable(
  'closet_item_style_tags',
  {
    closetItemId: uuid('closet_item_id')
      .notNull()
      .references(() => closetItems.id, { onDelete: 'cascade' }),
    styleTagId: uuid('style_tag_id')
      .notNull()
      .references(() => styleTags.id, { onDelete: 'cascade' }),
  },
  (t) => [primaryKey({ columns: [t.closetItemId, t.styleTagId] })],
);
