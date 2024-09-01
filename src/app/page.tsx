import CategoriesPanel from "@/components/categories-panel";
import ProductList from "@/components/products/product-list";
import { getProductsOptions } from "@/lib/types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home({
  searchParams,
}: {
  searchParams: {
    category: string | undefined;
    sort: string | undefined;
    price: string | undefined;
  };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery(
    getProductsOptions(
      searchParams.category,
      searchParams.sort,
      searchParams.price
    )
  );

  return (
    <>
      <CategoriesPanel />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductList />
      </HydrationBoundary>
    </>
  );
}
