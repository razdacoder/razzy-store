"use client";
import { getProductsOptions } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function useGetProducts() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as string | undefined;
  const sort = searchParams.get("sort") as string | undefined;
  const price = searchParams.get("price") as string | undefined;
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery(getProductsOptions(category, sort, price));
  return { data, isLoading, isError, fetchNextPage, hasNextPage };
}
