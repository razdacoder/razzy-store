import CategoriesPanel from "@/components/categories-panel";
import ProductList from "@/components/product-list";
import { productsQueryOptions } from "@/lib/types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};
export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(productsQueryOptions);
  return (
    <>
      <CategoriesPanel />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductList />
      </HydrationBoundary>
    </>
  );
}
