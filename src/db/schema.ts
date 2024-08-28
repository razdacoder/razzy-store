import { sql } from "drizzle-orm";
import { real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  price: real("price").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  images: text("images").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});
