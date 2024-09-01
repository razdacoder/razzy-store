import { db } from "@/db";
import { products } from "@/db/schema";
import { asc, desc, eq, lte } from "drizzle-orm";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const category = searchParams.get("category");
  const sort = searchParams.get("sort") || "createdAt";
  const price = searchParams.get("price");
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");

  const sortOptions = {
    "price-l-h": asc(products.price),
    "price-h-l": desc(products.price),
    createdAt: desc(products.createdAt),
  };

  // Start building the query
  const query = db.select().from(products);

  // Apply sorting
  if (sort in sortOptions) {
    query.orderBy(sortOptions[sort as keyof typeof sortOptions]);
  } else {
    query.orderBy(sortOptions["createdAt"]);
  }

  if (category) {
    query.where(eq(products.category, category));
  }

  if (price) {
    query.where(lte(products.price, Number(price)));
  }

  const offset = (page - 1) * limit;
  query.limit(limit).offset(offset);

  const data = await query;
  return Response.json(data);
}
