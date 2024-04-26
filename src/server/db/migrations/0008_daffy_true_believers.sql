DO $$ BEGIN
 CREATE TYPE "muscleGroup" AS ENUM('chest', 'legs', 'triceps', 'biceps', 'back', 'shoulders', 'abs', 'cardio', 'fullBody', 'other');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coachingClientsWeights" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"weight" numeric NOT NULL,
	"client_id" serial NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coachingExercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"muscle_group" "muscleGroup" NOT NULL,
	"link" text DEFAULT '' NOT NULL,
	"user_id" varchar NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coachingClientsWeights" ADD CONSTRAINT "coachingClientsWeights_client_id_coachingClients_id_fk" FOREIGN KEY ("client_id") REFERENCES "coachingClients"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coachingExercises" ADD CONSTRAINT "coachingExercises_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
