import CategoriesPanel from "@/components/categories-panel";
import ProductList from "@/components/product-list";
import { getProductsOptions } from "@/lib/types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};
export default async function Home({
  searchParams,
}: {
  searchParams: { category: string | undefined };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getProductsOptions(searchParams.category));
  return (
    <>
      <CategoriesPanel />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductList />
      </HydrationBoundary>
    </>
  );
}
