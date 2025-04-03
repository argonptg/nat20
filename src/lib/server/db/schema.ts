import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';

/**
 * Users Table
 * Stores user information such as login credentials and profile details.
 */
export const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }), // Unique user ID
    username: text('username').notNull().unique(), // Unique username
    email: text('email').notNull().unique(), // Unique email
    desc: text('desc'), // Optional user description
    hash: text('hash').notNull(), // Hashed password
    sessionToken: text('session_token'), // Session token for authentication
});

/**
 * Characters Table
 * Stores character data, linking them to users.
 */
export const characters = sqliteTable('characters', {
    id: integer('id').primaryKey({ autoIncrement: true }), // Unique character ID
    userId: integer('user_id')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }), // User who owns the character
    name: text('name').notNull(), // Character name
    desc: text('desc'), // Optional character description
    notes: text('notes'), // Notes for quick reference (e.g., DM clues)
    sheetJson: text('sheet_json').notNull(), // Character sheet data in JSON format
    created: text('created').notNull().default('CURRENT_TIMESTAMP'), // Timestamp of creation
});

/**
 * Campaigns Table
 * Stores information about role-playing campaigns.
 */
export const campaigns = sqliteTable('campaigns', {
    id: integer('id').primaryKey({ autoIncrement: true }), // Unique campaign ID
    name: text('name').notNull(), // Campaign name
    description: text('description'), // Campaign description
    createdBy: integer('created_by')
        .notNull()
        .references(() => users.id, { onDelete: 'cascade' }), // User who created the campaign
    created: text('created').notNull().default('CURRENT_TIMESTAMP'), // Timestamp of creation
});

/**
 * Campaign Participants Table
 * Links characters to campaigns, representing participation.
 */
export const campaignParticipants = sqliteTable('campaign_participants', {
    id: integer('id').primaryKey({ autoIncrement: true }), // Unique participant ID
    campaignId: integer('campaign_id')
        .notNull()
        .references(() => campaigns.id, { onDelete: 'cascade' }), // Campaign ID
    characterId: integer('character_id')
        .notNull()
        .references(() => characters.id, { onDelete: 'cascade' }), // Character ID
});

