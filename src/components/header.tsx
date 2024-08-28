"use client";
import { useNewProduct } from "@/hooks/use-new-product";
import { Plus } from "lucide-react";
import Logo from "./logo";
import { Button } from "./ui/button";

export default function Header() {
  const { onOpen } = useNewProduct();
  return (
    <header className="py-4 border-b">
      <div className="md:container px-4 flex justify-between items-center">
        <Logo />
        <Button onClick={onOpen} className="flex items-center gap-2">
          <Plus className="size-5" />
          New Product
        </Button>
      </div>
    </header>
  );
}
