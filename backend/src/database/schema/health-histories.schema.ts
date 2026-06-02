import {
  pgTable,
  uuid,
  decimal,
  text,
  boolean,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { pets } from './pets.schema';

export const healthHistories = pgTable('health_histories', {
  id: uuid('id').defaultRandom().primaryKey(),
  petId: uuid('pet_id')
    .notNull()
    .references(() => pets.id, { onDelete: 'cascade' }),
  recordedAt: timestamp('recorded_at').defaultNow().notNull(),
  symptoms: text('symptoms'),
  tutorNotes: text('tutor_notes'),
  temperatureCelsius: decimal('temperature_celsius', { precision: 4, scale: 1 }),
  weightAtRecord: decimal('weight_at_record_kg', { precision: 5, scale: 2 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
  isSynced: boolean('is_synced').default(false).notNull(),
});

export const healthHistoryPhotos = pgTable('health_history_photos', {
  id: uuid('id').defaultRandom().primaryKey(),
  healthHistoryId: uuid('health_history_id')
    .notNull()
    .references(() => healthHistories.id, { onDelete: 'cascade' }),
  photoUrl: text('photo_url').notNull(),
  caption: varchar('caption', { length: 255 }),
  takenAt: timestamp('taken_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
  isSynced: boolean('is_synced').default(false).notNull(),
});

export const healthHistoriesRelations = relations(healthHistories, ({ many }) => ({
  photos: many(healthHistoryPhotos),
}));

export const healthHistoryPhotosRelations = relations(healthHistoryPhotos, ({ one }) => ({
  healthHistory: one(healthHistories, {
    fields: [healthHistoryPhotos.healthHistoryId],
    references: [healthHistories.id],
  }),
}));

export type HealthHistory = typeof healthHistories.$inferSelect;
export type NewHealthHistory = typeof healthHistories.$inferInsert;
export type HealthHistoryPhoto = typeof healthHistoryPhotos.$inferSelect;
export type NewHealthHistoryPhoto = typeof healthHistoryPhotos.$inferInsert;
