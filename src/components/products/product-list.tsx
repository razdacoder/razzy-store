"use client";
import useGetProducts from "@/hooks/use-get-products";
import { useInView } from "react-intersection-observer";

import { useEffect } from "react";
import Loading from "../loader";
import ProductCard from "./product-card";

export default function ProductList() {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useGetProducts();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading && !data) {
    return <Loading />;
  }

  if (isError) {
    return (
      <main className="py-4 my-10">
        <div className="px-4 md:container flex justify-center items-center my-24">
          <p className="text-sm font-medium text-destructive">
            Failed to fetch products
          </p>
        </div>
      </main>
    );
  }

  if (data?.pages[0].length === 0) {
    return (
      <main className="py-4 my-10">
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
      <main className="py-4 my-10">
        <div className="px-4 md:container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {data.pages.map((page, index) =>
            page.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          )}
        </div>
        {hasNextPage && (
          <div ref={ref} className="py-4">
            <Loading />
          </div>
        )}
      </main>
    );
}
