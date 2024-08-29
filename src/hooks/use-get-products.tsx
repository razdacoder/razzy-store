"use client";
import { productsQueryOptions } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetProducts() {
  const { data, isLoading, isError } = useQuery(productsQueryOptions);
  return { data, isLoading, isError };
}
