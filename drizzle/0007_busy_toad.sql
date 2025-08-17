CREATE TYPE "public"."users_roles" AS ENUM('student', 'manager');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "users_roles" DEFAULT 'student' NOT NULL;