import {
  pgTable,
  uuid,
  varchar,
  date,
  integer,
  text,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';
import { pets } from './pets.schema';

export const vaccines = pgTable('vaccines', {
  id: uuid('id').defaultRandom().primaryKey(),
  petId: uuid('pet_id')
    .notNull()
    .references(() => pets.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 150 }).notNull(),
  manufacturer: varchar('manufacturer', { length: 100 }),
  recommendedAge: varchar('recommended_age', { length: 50 }),
  dose: integer('dose'),
  dateTaken: date('date_taken'),
  scheduledDate: date('scheduled_date'),
  nextDose: date('next_dose'),
  batchNumber: varchar('batch_number', { length: 60 }),
  clinic: varchar('clinic_name', { length: 150 }),
  vet: varchar('veterinarian_name', { length: 150 }),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
  isSynced: boolean('is_synced').default(false).notNull(),
});

export type Vaccine = typeof vaccines.$inferSelect;
export type NewVaccine = typeof vaccines.$inferInsert;
