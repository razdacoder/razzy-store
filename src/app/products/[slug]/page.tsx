// export const metadata: Metadata = {
//   title: "Product",
// };

import { getProductOptions } from "@/lib/types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata, ResolvingMetadata } from "next";
import ProductPageClient from "./product-page";

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const origin = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const product = await fetch(`${origin}/api/products/${slug}`).then((res) =>
    res.json()
  );

  return {
    title: product.title,
  };
}

export default async function ProductPage({ params }: Props) {
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
