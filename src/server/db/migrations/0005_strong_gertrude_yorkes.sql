ALTER TABLE "coachingClients" ALTER COLUMN "email" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "coachingClients" ALTER COLUMN "height" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "coachingClients" ALTER COLUMN "current_weight" DROP NOT NULL;