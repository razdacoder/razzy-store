import { getProductOptions } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

export default function useGetProduct({ slug }: { slug?: string }) {
  const { data, isLoading, isError } = useQuery(getProductOptions(slug));
  return { data, isLoading, isError };
}
