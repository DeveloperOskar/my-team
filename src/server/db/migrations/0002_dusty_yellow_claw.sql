CREATE TABLE IF NOT EXISTS "userSystemFoodLikes" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"system_food_id" serial NOT NULL,
	"user_id" varchar NOT NULL,
	"liked" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "systemFoods" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	"unit" "food_unit" NOT NULL,
	"serving_size" smallint NOT NULL,
	"protein" numeric NOT NULL,
	"carbs" numeric NOT NULL,
	"fat" numeric NOT NULL,
	"kcal" numeric NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userSystemFoodLikes" ADD CONSTRAINT "userSystemFoodLikes_system_food_id_systemFoods_id_fk" FOREIGN KEY ("system_food_id") REFERENCES "systemFoods"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userSystemFoodLikes" ADD CONSTRAINT "userSystemFoodLikes_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
