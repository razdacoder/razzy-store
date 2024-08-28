"use client";
import { Plus } from "lucide-react";
import Logo from "./logo";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="py-4 border-b">
      <div className="md:container px-4 flex justify-between items-center">
        <Logo />
        <Button className="flex items-center gap-2">
          <Plus className="size-5" />
          New Product
        </Button>
      </div>
    </header>
  );
}
