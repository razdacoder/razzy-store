import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product",
};

import { getProductOptions } from "@/lib/types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductPageClient from "./product-page";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(getProductOptions(params.slug));
  return (
    <main className="py-4">
      <div className="px-4 md:container">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ProductPageClient slug={params.slug} />
        </HydrationBoundary>
      </div>
    </main>
  );
}
