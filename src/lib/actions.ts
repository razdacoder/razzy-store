"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import slugify from "slugify";
import { productScheme, ProductValues } from "./schema";

export const createProduct = async (values: ProductValues) => {
  const { title, images, price, description, category } =
    productScheme.parse(values);

  const id = createId();
  const slug = slugify(title);
  try {
    const [newProduct] = await db
      .insert(products)
      .values({
        id,
        title,
        slug,
        description,
        price,
        category: category.toLowerCase(),
        images: images.join(","),
      })
      .returning();
    return newProduct;
  } catch (error) {
    console.error("Error creating product:", error);
    throw new Error("Failed to create product");
  }
};
