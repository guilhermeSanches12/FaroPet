import {
  pgTable,
  uuid,
  varchar,
  boolean,
  text,
  timestamp,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { pets } from './pets.schema';

export const reminderTypeEnum = pgEnum('reminder_type', [
  'vaccine',
  'appointment',
  'medication',
  'general',
]);

export const reminders = pgTable('reminders', {
  id: uuid('id').defaultRandom().primaryKey(),
  petId: uuid('pet_id')
    .notNull()
    .references(() => pets.id, { onDelete: 'cascade' }),
  type: reminderTypeEnum('type').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  remindAt: timestamp('remind_at').notNull(),
  isSent: boolean('is_sent').default(false).notNull(),
  isDismissed: boolean('is_dismissed').default(false).notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  pushSentAt: timestamp('push_sent_at'),
  referenceId: uuid('reference_id'),
  referenceTable: varchar('reference_table', { length: 60 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
  isSynced: boolean('is_synced').default(false).notNull(),
});

export type Reminder = typeof reminders.$inferSelect;
export type NewReminder = typeof reminders.$inferInsert;
