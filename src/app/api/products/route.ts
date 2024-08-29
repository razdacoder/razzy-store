import { db } from "@/db";
import { products } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");

  const query = db.select().from(products).orderBy(desc(products.createdAt));
  if (category) {
    query.where(eq(products.category, category));
  }

  const data = await query;
  return Response.json(data);
}
