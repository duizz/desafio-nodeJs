ALTER TABLE "enrollments" ALTER COLUMN "createAt" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "enrollments" ALTER COLUMN "createAt" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "enrollments" ALTER COLUMN "createAt" SET NOT NULL;