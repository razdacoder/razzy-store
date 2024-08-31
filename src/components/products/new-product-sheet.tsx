import { useNewProduct } from "@/hooks/use-new-product";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import ProductForm from "./product-form";

export default function NewProductSheet() {
  const { isOpen, onClose } = useNewProduct();
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-medium">Add new product</SheetTitle>
          <SheetDescription>
            Fill in the details below to add new product.
          </SheetDescription>
        </SheetHeader>
        <ProductForm />
      </SheetContent>
    </Sheet>
  );
}
