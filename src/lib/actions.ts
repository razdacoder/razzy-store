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
  const [newProduct] = await db
    .insert(products)
    .values({
      id,
      title,
      slug,
      description,
      price,
      category,
      images: images.join(","),
    })
    .returning();
  return newProduct;
};
