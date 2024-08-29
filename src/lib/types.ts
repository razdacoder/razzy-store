import { queryOptions } from "@tanstack/react-query";

export interface Product {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: string;
  images: string;
  createdAt: string | null;
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
