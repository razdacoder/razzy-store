"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { categories } from "@/lib/config";
import { SlidersHorizontal } from "lucide-react";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function CategoriesPanel() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const categoryParam = searchParams.get("category");
  const [range, setRange] = useState([0, 24]);

  const handleRangeChange = (value: number[]) => {
    setRange(value);
  };

  const changeCategory = (category: string | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="py-2 border-b">
      <div className="px-4 md:container ">
        <div className="flex justify-between items-center">
          <div className="md:hidden">
            <Select
              onValueChange={(value) =>
                value === "all"
                  ? changeCategory(undefined)
                  : changeCategory(value)
              }
              defaultValue={!categoryParam ? "all" : categoryParam}
            >
              <SelectTrigger className="w-fit">
                <SelectValue className="capitalize" placeholder="Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {categories.map((category) => (
                  <SelectItem
                    key={`select-${category}`}
                    value={category.toLowerCase()}
                    className="capitalize"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="link"
              onClick={() => changeCategory(undefined)}
              className={cn(
                "px-0",
                !categoryParam && "text-destructive underline"
              )}
            >
              All
            </Button>
            {categories.map((category) => (
              <Button
                onClick={() => changeCategory(category)}
                key={`btn-${category}`}
                variant="link"
                className={cn(
                  "px-0 capitalize",
                  categoryParam === category && "text-destructive underline"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex gap-2 items-center">
                <SlidersHorizontal className="size-4" />
                Filter & Sort
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-sm ">FILTER & SORT</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col">
                <Accordion type="multiple" className="w-full flex-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-sm hover:no-underline">
                      SORT BY
                    </AccordionTrigger>
                    <AccordionContent className="">
                      <RadioGroup defaultValue="newset" className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            className="rounded-none border-2"
                            value="newset"
                            id="newest"
                          />
                          <Label htmlFor="newest">Newest</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            className="rounded-none border-2"
                            value="price-l-h"
                            id="price-l-h"
                          />
                          <Label htmlFor="price-l-h">Price Low to High</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            className="rounded-none border-2"
                            value="price-h-l"
                            id="price-h-l"
                          />
                          <Label htmlFor="price-h-l">Price High to Low</Label>
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-sm hover:no-underline">
                      PRICE
                    </AccordionTrigger>
                    <AccordionContent className="my-4">
                      <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        className=""
                      />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <SheetFooter className="flex items-center gap-2 mt-10 justify-start">
                  <Button variant="outline" size="lg" className="w-full">
                    RESST
                  </Button>
                  <Button size="lg" className="w-full">
                    APPLY
                  </Button>
                </SheetFooter>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
