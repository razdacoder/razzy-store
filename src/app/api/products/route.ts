import { db } from "@/db";
import { products } from "@/db/schema";

export async function GET(request: Request) {
  const data = await db.select().from(products);
  return Response.json(data);
}
