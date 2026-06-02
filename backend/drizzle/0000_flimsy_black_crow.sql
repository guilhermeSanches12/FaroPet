CREATE TYPE "public"."pet_gender" AS ENUM('male', 'female', 'unknown');--> statement-breakpoint
CREATE TYPE "public"."pet_species" AS ENUM('dog', 'cat', 'bird', 'fish', 'hamster', 'rabbit', 'reptile', 'other');--> statement-breakpoint
CREATE TYPE "public"."med_type" AS ENUM('pill', 'liquid', 'injection', 'topical', 'other');--> statement-breakpoint
CREATE TYPE "public"."appointment_status" AS ENUM('scheduled', 'completed', 'canceled', 'rescheduled');--> statement-breakpoint
CREATE TYPE "public"."reminder_type" AS ENUM('vaccine', 'appointment', 'medication', 'general');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL,
	"phone" varchar(30),
	"cpf" varchar(20),
	"avatar_url" text,
	"city" varchar(100),
	"state" varchar(2),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_synced" boolean DEFAULT false NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "pets" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"name" varchar(100) NOT NULL,
	"species" "pet_species" NOT NULL,
	"breed" varchar(100),
	"gender" "pet_gender" DEFAULT 'unknown' NOT NULL,
	"birth_date" date,
	"weight_kg" numeric(5, 2),
	"color" varchar(80),
	"microchip_code" varchar(50),
	"conditions" text,
	"notes" text,
	"photo_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_synced" boolean DEFAULT false NOT NULL,
	CONSTRAINT "pets_microchip_code_unique" UNIQUE("microchip_code")
);
--> statement-breakpoint
CREATE TABLE "vaccines" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pet_id" uuid NOT NULL,
	"name" varchar(150) NOT NULL,
	"manufacturer" varchar(100),
	"recommended_age" varchar(50),
	"dose" integer,
	"date_taken" date,
	"scheduled_date" date,
	"next_dose" date,
	"batch_number" varchar(60),
	"clinic_name" varchar(150),
	"veterinarian_name" varchar(150),
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_synced" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medications" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pet_id" uuid NOT NULL,
	"name" varchar(150) NOT NULL,
	"dosage" varchar(100),
	"frequency" varchar(100) NOT NULL,
	"duration_days" integer NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"fasting" boolean DEFAULT false NOT NULL,
	"type" "med_type" NOT NULL,
	"reason" varchar(255) NOT NULL,
	"prescribed_by" varchar(150),
	"observations" text,
	"doses" jsonb DEFAULT '[]'::jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_synced" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pet_id" uuid NOT NULL,
	"date" date NOT NULL,
	"time" varchar(10) NOT NULL,
	"reason" varchar(255) NOT NULL,
	"location" varchar(255) NOT NULL,
	"veterinarian_name" varchar(150),
	"has_medication" boolean DEFAULT false NOT NULL,
	"medication_details" varchar(255),
	"observations" text,
	"diagnosis" text,
	"prescription" text,
	"status" "appointment_status" DEFAULT 'scheduled' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_synced" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reminders" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pet_id" uuid NOT NULL,
	"type" "reminder_type" NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"remind_at" timestamp NOT NULL,
	"is_sent" boolean DEFAULT false NOT NULL,
	"is_dismissed" boolean DEFAULT false NOT NULL,
	"reference_id" uuid,
	"reference_table" varchar(60),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_synced" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "health_histories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pet_id" uuid NOT NULL,
	"recorded_at" timestamp DEFAULT now() NOT NULL,
	"symptoms" text,
	"tutor_notes" text,
	"temperature_celsius" numeric(4, 1),
	"weight_at_record_kg" numeric(5, 2),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_synced" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "health_history_photos" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"health_history_id" uuid NOT NULL,
	"photo_url" text NOT NULL,
	"caption" varchar(255),
	"taken_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"deleted_at" timestamp,
	"is_synced" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pets" ADD CONSTRAINT "pets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vaccines" ADD CONSTRAINT "vaccines_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medications" ADD CONSTRAINT "medications_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reminders" ADD CONSTRAINT "reminders_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "health_histories" ADD CONSTRAINT "health_histories_pet_id_pets_id_fk" FOREIGN KEY ("pet_id") REFERENCES "public"."pets"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "health_history_photos" ADD CONSTRAINT "health_history_photos_health_history_id_health_histories_id_fk" FOREIGN KEY ("health_history_id") REFERENCES "public"."health_histories"("id") ON DELETE cascade ON UPDATE no action;