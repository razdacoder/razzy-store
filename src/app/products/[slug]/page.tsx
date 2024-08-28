import ImageCarousel from "@/components/image-carousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product",
};

import SizeGuides from "@/components/size-giudes";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { formatToNaira } from "@/lib/utils";
import { Edit, LogIn, Shield, ShoppingBag, Store, Trash } from "lucide-react";

export default function ProductPage() {
  return (
    <main className="py-4">
      <div className="px-4 md:container">
        <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <div>
            <ImageCarousel />
          </div>
          <div className="py-4 w-full md:w-3/4">
            <Breadcrumb className="hidden md:block">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/components">Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className="my-8 space-y-4">
              <h2 className="text-3xl font-semibold">Knit strap top</h2>
              <h5 className="text-lg font-medium">{formatToNaira(40000)}</h5>
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
              <p className="text-sm leading-6 font-medium text-muted-foreground">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti fugiat adipisci quia doloribus hic sit, quidem quam
                aliquam dolore. Libero ullam aliquid non pariatur voluptas?
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Accusamus sunt totam.
              </p>
            </div>
            <div className="my-8 flex items-center gap-4">
              <Button variant="outline" className="flex items-center gap-2">
                <Edit className="size-4" />
                Edit Product
              </Button>
              <Button variant="destructive" className="flex items-center gap-2">
                <Trash className="size-4" />
                Delete Product
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
