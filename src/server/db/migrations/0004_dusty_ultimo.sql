DO $$ BEGIN
 CREATE TYPE "client_goal" AS ENUM('gain', 'lose', 'maintain');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "coachingClients" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"extraInfo" text DEFAULT '' NOT NULL,
	"height" numeric NOT NULL,
	"current_weight" numeric NOT NULL,
	"goal" "client_goal" NOT NULL,
	"background_color" text NOT NULL,
	"text_color" text NOT NULL,
	"protein" numeric NOT NULL,
	"carbs" numeric NOT NULL,
	"fat" numeric NOT NULL,
	"kcal" numeric NOT NULL,
	"user_id" varchar NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "coachingClients" ADD CONSTRAINT "coachingClients_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
