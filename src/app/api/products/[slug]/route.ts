import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const [data] = await db
    .select()
    .from(products)
    .where(eq(products.slug, params.slug));
  if (!data) {
    return new Response(`Product not found`, {
      status: 404,
    });
  }
  return Response.json(data);
}
