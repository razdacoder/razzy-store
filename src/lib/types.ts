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

export function getProductsOptions(
  category?: string,
  sort?: string,
  price?: string
) {
  return queryOptions({
    queryKey: ["products", category, sort, price],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }

      if (sort) {
        params.set("sort", sort);
      } else {
        params.delete("sort");
      }

      if (price) {
        params.set("price", price);
      } else {
        params.delete("price");
      }

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) {
        throw new Error("Could not fetch products");
      }
      const data = (await res.json()) as Product[];
      return data;
    },
  });
}

export function getProductOptions(slug?: string) {
  return queryOptions({
    enabled: !!slug,
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
