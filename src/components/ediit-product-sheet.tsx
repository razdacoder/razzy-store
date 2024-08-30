import { useEditProduct } from "@/hooks/use-edit-product";
import useGetProduct from "@/hooks/use-get-product";
import { Loader } from "lucide-react";
import ProductForm from "./product-form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

export default function EditProductSheet() {
  const { slug, isOpen, onClose } = useEditProduct();
  const { data, isLoading } = useGetProduct({ slug });

  const loading = isLoading;
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Product</SheetTitle>
          <SheetDescription>
            Fill the form below to edit the product.
          </SheetDescription>
        </SheetHeader>
        {loading ? (
          <div className="w-full h-full">
            <Loader className="size-5 animate-spin" />
          </div>
        ) : (
          <ProductForm product={data} />
        )}
      </SheetContent>
    </Sheet>
  );
}
