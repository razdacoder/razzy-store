import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: text("id").primaryKey().notNull(),
  title: text("title").notNull(),
});
