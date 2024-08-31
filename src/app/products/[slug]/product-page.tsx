"use client";

import SizeGuides from "@/components/size-giudes";
import useGetProduct from "@/hooks/use-get-product";
import { Loader } from "lucide-react";

import ImageCarousel from "@/components/image-carousel";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import useDeleteProduct from "@/hooks/use-delete-product";
import { useEditProduct } from "@/hooks/use-edit-product";
import { formatToNaira } from "@/lib/utils";
import { Edit, LogIn, Shield, ShoppingBag, Store, Trash } from "lucide-react";

export default function ProductPageClient({ slug }: { slug: string }) {
  const { data, isLoading, isError } = useGetProduct({ slug });
  const { deleteProductFn, isPending } = useDeleteProduct();
  const { onOpen } = useEditProduct();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center my-20">
        <Loader className="size-5 animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center my-20">
        <p className="text-sm font-medium text-destructive">
          Failed to fetch product
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center my-20">
        <p className="text-sm font-medium">Product not found</p>
      </div>
    );
  }

  if (data)
    return (
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <div>
          <ImageCarousel images={data.images} />
        </div>
        <div className="py-4 w-full lg:w-3/4">
          <Breadcrumb className="hidden md:block">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/?category=${data.category}`}
                  className="capitalize"
                >
                  {data?.category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{data.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="my-8 space-y-4">
            <h2 className="text-3xl font-semibold">{data.title}</h2>
            <h5 className="text-lg font-medium">{formatToNaira(data.price)}</h5>
          </div>

          <div className="my-8">
            <SizeGuides />
          </div>
          <div className="my-8 border-b border-black pb-8">
            <div className="grid grid-cols-2 my-4">
              <div className="space-y-4">
                <div className="flex gap-2 items-center">
                  <ShoppingBag className="size-4" />
                  <span className="text-xs font-medium">
                    Free delivery to store
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <Store className="size-4" />
                  <span className="text-xs font-medium">
                    Store availability
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex gap-2 items-center">
                  <LogIn className="size-4" />
                  <span className="text-xs font-medium">
                    Returns within 30 days
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <Shield className="size-4" />
                  <span className="text-xs font-medium">Secure payment</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h6 className="font-medium">DESCRIPTION</h6>
            <p className="text-sm font-medium text-muted-foreground text-pretty text-justify">
              {data.description}
            </p>
          </div>
          <div className="my-8 flex items-center gap-4">
            <Button
              onClick={() => onOpen(data.slug)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Edit className="size-4" />
              Edit Product
            </Button>
            <Button
              onClick={() => deleteProductFn(data.id)}
              variant="destructive"
              className="flex items-center gap-2"
            >
              {isPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                <>
                  <Trash className="size-4" />
                  Delete Product
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
}
