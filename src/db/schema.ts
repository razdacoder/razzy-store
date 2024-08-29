import { categories } from "@/lib/config";
import {
  pgEnum,
  pgTable,
  real,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

export const categoryEnum = pgEnum("categories", categories);

export const products = pgTable("products", {
  id: uuid("id").primaryKey().notNull().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  price: real("price").notNull(),
  description: text("description").notNull(),
  category: categoryEnum("category"),
  images: text("images").array().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
