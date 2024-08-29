"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import slugify from "slugify";
import { productScheme, ProductValues } from "./schema";

export const createProduct = async (values: ProductValues) => {
  const { title, images, price, description, category } =
    productScheme.parse(values);

  const id = createId();
  const slug = slugify(title, { lower: true });
  try {
    const [newProduct] = await db
      .insert(products)
      .values({
        title,
        slug,
        description,
        price,
        category,
        images,
      })
      .returning();
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
};

export const deleteProduct = async (id: string) => {
  await db.delete(products).where(eq(products.id, id));
};
