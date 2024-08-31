"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { eq } from "drizzle-orm";
import slugify from "slugify";
import { productScheme, ProductValues } from "./schema";

export const createProduct = async (values: ProductValues) => {
  const { title, images, price, description, category } =
    productScheme.parse(values);
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

export const updateProduct = async (
  slug: string,
  updateValues: ProductValues
) => {
  const { title, description, price, category, images } =
    productScheme.parse(updateValues);
  try {
    const [data] = await db
      .update(products)
      .set({ title, description, price, category, images })
      .where(eq(products.slug, slug))
      .returning();
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
};
