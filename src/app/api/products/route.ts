import { db } from "@/db";
import { products } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function GET(request: Request) {
  const data = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt));
  return Response.json(data);
}
