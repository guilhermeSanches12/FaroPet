import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';
import { users } from './users.schema';

export const adoptions = pgTable('adoptions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  animalName: varchar('animal_name', { length: 100 }),
  animalType: varchar('animal_type', { length: 30 }).notNull(),
  breed: varchar('breed', { length: 100 }),
  gender: varchar('gender', { length: 20 }).notNull(),
  age: varchar('age', { length: 30 }),
  size: varchar('size', { length: 20 }),
  photo: text('photo_url'),
  description: text('description').notNull(),
  healthInfo: text('health_info'),
  vaccinationInfo: text('vaccination_info'),
  requirements: text('requirements'),
  observations: text('observations'),
  city: varchar('city', { length: 100 }).notNull(),
  state: varchar('state', { length: 2 }).notNull(),
  contactName: varchar('contact_name', { length: 100 }).notNull(),
  contactPhone: varchar('contact_phone', { length: 30 }),
  contactWhatsapp: varchar('contact_whatsapp', { length: 30 }),
  status: varchar('status', { length: 20 }).default('available').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});

export type Adoption = typeof adoptions.$inferSelect;
export type NewAdoption = typeof adoptions.$inferInsert;
