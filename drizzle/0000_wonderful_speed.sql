DO $$ BEGIN
 CREATE TYPE "public"."categories" AS ENUM('suits', 'agbada', 'kaftan');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"price" real NOT NULL,
	"description" text NOT NULL,
	"category" "categories",
	"images" text[] NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);
