import { z } from "zod";
import { categories } from "./config";

export const productScheme = z.object({
  title: z.string().trim().min(2, { message: "This field is required" }),
  category: z.enum(categories),
  price: z.coerce.number(),
  images: z.array(z.string()),
  description: z
    .string()
    .trim()
    .min(20, { message: "This field must be not be less than 20 characters" }),
});

export type ProductValues = z.infer<typeof productScheme>;
