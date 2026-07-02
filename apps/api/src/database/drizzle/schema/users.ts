import { pgEnum, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const authProviderEnum = pgEnum('auth_provider', ['email', 'google']);

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  avatarUrl: text('avatar_url'),
  provider: authProviderEnum('provider').notNull().default('email'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});
