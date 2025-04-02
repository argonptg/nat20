import { sqliteTable, integer, text, unique, primaryKey } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    username: text('username').notNull().unique(),
    email: text('email').notNull().unique(),
    desc: text('desc'),
    hash: text('hash').notNull(),
    sessionToken: text('session_token'),
});

export const characters = sqliteTable('characters', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    name: text('name').notNull(),
    desc: text('desc'),
    sheetJson: text('sheet_json').notNull(),
    created: text('created').notNull().default('CURRENT_TIMESTAMP'),
});
