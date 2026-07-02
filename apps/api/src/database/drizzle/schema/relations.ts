import { relations } from 'drizzle-orm';
import {
  brands,
  closetItemColors,
  closetItemSeasons,
  closetItemStyleTags,
  closetItems,
  colors,
  seasons,
  styleTags,
} from './clothing';
import { outfitItems, outfits } from './outfits';
import { users } from './users';

export const usersRelations = relations(users, ({ many }) => ({
  closetItems: many(closetItems),
  outfits: many(outfits),
}));

export const brandsRelations = relations(brands, ({ many }) => ({
  closetItems: many(closetItems),
}));

export const closetItemsRelations = relations(closetItems, ({ one, many }) => ({
  user: one(users, { fields: [closetItems.userId], references: [users.id] }),
  brand: one(brands, { fields: [closetItems.brandId], references: [brands.id] }),
  colors: many(closetItemColors),
  seasons: many(closetItemSeasons),
  styleTags: many(closetItemStyleTags),
}));

export const closetItemColorsRelations = relations(closetItemColors, ({ one }) => ({
  closetItem: one(closetItems, { fields: [closetItemColors.closetItemId], references: [closetItems.id] }),
  color: one(colors, { fields: [closetItemColors.colorId], references: [colors.id] }),
}));

export const closetItemSeasonsRelations = relations(closetItemSeasons, ({ one }) => ({
  closetItem: one(closetItems, { fields: [closetItemSeasons.closetItemId], references: [closetItems.id] }),
  season: one(seasons, { fields: [closetItemSeasons.seasonId], references: [seasons.id] }),
}));

export const closetItemStyleTagsRelations = relations(closetItemStyleTags, ({ one }) => ({
  closetItem: one(closetItems, { fields: [closetItemStyleTags.closetItemId], references: [closetItems.id] }),
  styleTag: one(styleTags, { fields: [closetItemStyleTags.styleTagId], references: [styleTags.id] }),
}));

export const outfitsRelations = relations(outfits, ({ one, many }) => ({
  user: one(users, { fields: [outfits.userId], references: [users.id] }),
  items: many(outfitItems),
}));

export const outfitItemsRelations = relations(outfitItems, ({ one }) => ({
  outfit: one(outfits, { fields: [outfitItems.outfitId], references: [outfits.id] }),
  closetItem: one(closetItems, { fields: [outfitItems.closetItemId], references: [closetItems.id] }),
}));
