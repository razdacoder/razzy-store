import { queryOptions } from "@tanstack/react-query";

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  createdAt: Date | null;
}

export const productsQueryOptions = queryOptions({
  queryKey: ["products"],
  queryFn: async () => {
    const res = await fetch("/api/products");
    if (!res.ok) {
      throw new Error("Could not fetch products");
    }
    const data = (await res.json()) as Product[];
    return data;
  },
});

export function getProductOptions(slug: string) {
  return queryOptions({
    queryKey: ["product", slug],
    queryFn: async () => {
      const res = await fetch(`/api/products/${slug}`);
      if (!res.ok) {
        throw new Error("Could not fetch products");
      }
      const data = (await res.json()) as Product;
      return data;
    },
  });
}
