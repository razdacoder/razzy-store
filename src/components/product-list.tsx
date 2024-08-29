"use client";
import useGetProducts from "@/hooks/use-get-products";
import { Loader } from "lucide-react";
import ProductCard from "./product-card";

export default function ProductList() {
  const { data, isLoading, isError } = useGetProducts();

  if (isLoading) {
    <main className="py-4 mb-10">
      <div className="px-4 md:container flex justify-center items-center my-24">
        <Loader className="size-5 animate-spin" />
      </div>
    </main>;
  }

  if (isError) {
    <main className="py-4 mb-10">
      <div className="px-4 md:container flex justify-center items-center my-24">
        <p className="text-sm font-medium text-destructive">
          Failed to fetch products
        </p>
      </div>
    </main>;
  }

  if (!data || data.length === 0) {
    return (
      <main className="py-4 mb-10">
        <div className="px-4 md:container flex justify-center items-center my-24">
          <p className="text-sm font-medium">
            No products to show at this time.
          </p>
        </div>
      </main>
    );
  }
  if (data)
    return (
      <main className="py-4 mb-10">
        <div className="px-4 md:container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {data?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
    );
}
