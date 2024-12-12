ALTER TABLE "todo" ADD COLUMN "user" text NOT NULL;--> statement-breakpoint
ALTER TABLE "todo" DROP COLUMN IF EXISTS "username";