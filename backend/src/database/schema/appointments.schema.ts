import {
  pgTable,
  uuid,
  varchar,
  date,
  boolean,
  text,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { pets } from './pets.schema';

export const appointmentStatusEnum = pgEnum('appointment_status', [
  'scheduled',
  'completed',
  'canceled',
  'rescheduled',
]);

export const appointments = pgTable('appointments', {
  id: uuid('id').defaultRandom().primaryKey(),
  petId: uuid('pet_id')
    .notNull()
    .references(() => pets.id, { onDelete: 'cascade' }),
  date: date('date').notNull(),
  time: varchar('time', { length: 10 }).notNull(),
  reason: varchar('reason', { length: 255 }).notNull(),
  location: varchar('location', { length: 255 }).notNull(),
  vet: varchar('veterinarian_name', { length: 150 }),
  hasMedication: boolean('has_medication').default(false).notNull(),
  medicationDetails: varchar('medication_details', { length: 255 }),
  observations: text('observations'),
  diagnosis: text('diagnosis'),
  prescription: text('prescription'),
  status: appointmentStatusEnum('status').default('scheduled').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
  isSynced: boolean('is_synced').default(false).notNull(),
});

export type Appointment = typeof appointments.$inferSelect;
export type NewAppointment = typeof appointments.$inferInsert;
