import {
  pgTable,
  uuid,
  varchar,
  date,
  decimal,
  text,
  boolean,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const petSpeciesEnum = pgEnum('pet_species', [
  'dog',
  'cat',
  'bird',
  'fish',
  'hamster',
  'rabbit',
  'reptile',
  'other',
]);

export const petGenderEnum = pgEnum('pet_gender', ['male', 'female', 'unknown']);

export const pets = pgTable('pets', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  species: petSpeciesEnum('species').notNull(),
  breed: varchar('breed', { length: 100 }),
  gender: petGenderEnum('gender').notNull().default('unknown'),
  birthDate: date('birth_date'),
  weight: decimal('weight_kg', { precision: 5, scale: 2 }),
  color: varchar('color', { length: 80 }),
  microchipCode: varchar('microchip_code', { length: 50 }).unique(),
  conditions: text('conditions'),
  notes: text('notes'),
  photo: text('photo_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
  isSynced: boolean('is_synced').default(false).notNull(),
});

export type Pet = typeof pets.$inferSelect;
export type NewPet = typeof pets.$inferInsert;
