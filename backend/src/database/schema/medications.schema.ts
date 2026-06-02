import {
  pgTable,
  uuid,
  varchar,
  date,
  integer,
  boolean,
  text,
  timestamp,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { pets } from './pets.schema';

export const medTypeEnum = pgEnum('med_type', [
  'pill',
  'liquid',
  'injection',
  'topical',
  'other',
]);

export const medications = pgTable('medications', {
  id: uuid('id').defaultRandom().primaryKey(),
  petId: uuid('pet_id')
    .notNull()
    .references(() => pets.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 150 }).notNull(),
  dosage: varchar('dosage', { length: 100 }),
  frequency: varchar('frequency', { length: 100 }).notNull(),
  durationDays: integer('duration_days').notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date').notNull(),
  fasting: boolean('fasting').default(false).notNull(),
  type: medTypeEnum('type').notNull(),
  reason: varchar('reason', { length: 255 }).notNull(),
  prescribedBy: varchar('prescribed_by', { length: 150 }),
  observations: text('observations'),
  doses: jsonb('doses').$type<DoseRecord[]>().default([]),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
  isSynced: boolean('is_synced').default(false).notNull(),
});

export interface DoseRecord {
  date: string;
  time: string;
  status: 'taken' | 'skipped' | 'pending';
}

export type Medication = typeof medications.$inferSelect;
export type NewMedication = typeof medications.$inferInsert;
