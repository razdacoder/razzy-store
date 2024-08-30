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

import { cn, formatToNaira } from "@/lib/utils";
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
  const [isOpen, setOpen] = useState(false);
  const sort = searchParams.get("sort");
  const price = searchParams.get("price");
  const [filters, setFilters] = useState({
    sort: sort,
    category: categoryParam,
    price: price,
  });
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

  const handleApplyFilter = () => {
    const params = new URLSearchParams(searchParams);
    if (filters.category) {
      params.set("category", filters.category);
    } else {
      params.delete("category");
    }

    if (filters.sort) {
      params.set("sort", filters.sort);
    } else {
      params.delete("sort");
    }

    if (filters.price) {
      params.set("price", filters.price.toString());
    } else {
      params.delete("price");
    }

    router.push(`${pathname}?${params.toString()}`);
    setOpen(false);
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
          <Sheet open={isOpen} onOpenChange={setOpen}>
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
                      <RadioGroup
                        onValueChange={(value) =>
                          setFilters((filters) => ({ ...filters, sort: value }))
                        }
                        defaultValue={!filters.sort ? "newset" : filters.sort}
                        className="space-y-2"
                      >
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

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-sm hover:no-underline">
                      CATEGORIES
                    </AccordionTrigger>
                    <AccordionContent className="">
                      <RadioGroup
                        defaultValue={
                          !filters.category ? "all" : filters.category
                        }
                        onValueChange={(value) =>
                          setFilters((filters) => ({
                            ...filters,
                            category: value,
                          }))
                        }
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            className="rounded-none border-2"
                            value="all"
                            id="all"
                          />
                          <Label htmlFor="all" className="capitalize">
                            All
                          </Label>
                        </div>
                        {categories.map((category) => (
                          <div
                            key={`category-filter-${category}`}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              className="rounded-none border-2"
                              value={category}
                              id={`id-${category}`}
                            />
                            <Label
                              htmlFor={`id-${category}`}
                              className="capitalize"
                            >
                              {category}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-sm hover:no-underline">
                      PRICE
                    </AccordionTrigger>
                    <AccordionContent className="my-4">
                      <Slider
                        defaultValue={
                          !filters.price ? [100000] : [Number(filters.price)]
                        }
                        max={200000}
                        step={1000}
                        onValueChange={(value) =>
                          setFilters((filters) => ({
                            ...filters,
                            price: value[0].toString(),
                          }))
                        }
                      />
                      <p className="mt-2 text">
                        {formatToNaira(Number(filters.price) || 100000)}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <SheetFooter className="flex items-center gap-2 mt-10 justify-start">
                  <Button variant="outline" size="lg" className="w-full">
                    RESST
                  </Button>
                  <Button
                    onClick={handleApplyFilter}
                    size="lg"
                    className="w-full"
                  >
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
