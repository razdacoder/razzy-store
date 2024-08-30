import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/lib/config";
import { productScheme, ProductValues } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import useCreateProduct from "@/hooks/use-create-product";
import { useNewProduct } from "@/hooks/use-new-product";
import { Product } from "@/lib/types";
import { uploadFiles } from "@/lib/uploadthing";
import { Loader, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface ProductFormProps {
  product?: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();
  const { onClose } = useNewProduct();
  const router = useRouter();
  const isEditMode = !!product;

  const form = useForm<ProductValues>({
    resolver: zodResolver(productScheme),
    defaultValues: isEditMode
      ? {
          title: product.title,
          category: product.category,
          description: product.description,
          price: product.price,
        }
      : {
          title: "",
          description: "",
          category: "",
          images: [],
          price: 0,
        },
  });

  const { mutate } = useCreateProduct();

  function onSubmit(values: ProductValues) {
    startTransition(async () => {
      if (files.length > 0) {
        const res = await uploadFiles("imageUploader", {
          files,
        });
        const images = res.map((r) => r.url);
        mutate(
          { ...values, images: images },
          {
            onSuccess: () => {
              onClose();
              form.reset();
              setFiles([]);
              router.push("/");
            },
          }
        );
      }
    });
  }
  return (
    <Form {...form}>
      <form className="space-y-6 mt-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select
                disabled={isPending}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue
                      className="capitalize"
                      placeholder="Select a category"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={`form-category-${category}`}
                      value={category}
                      className="capitalize"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="price"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea disabled={isPending} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <Label>Images</Label>
          <div className="grid grid-cols-3 gap-2">
            {files.map((file) => {
              const imageUrl = URL.createObjectURL(file);
              return (
                <Image
                  key={file.name}
                  src={imageUrl}
                  alt="Upload File"
                  className="aspect-square w-full rounded-md object-cover"
                  height="300"
                  width="300"
                />
              );
            })}
            {files.length < 3 && (
              <div>
                <input
                  className="hidden"
                  onChange={(e) =>
                    setFiles((files) => [...files, e.target.files![0]])
                  }
                  id="image"
                  type="file"
                  accept="image/*"
                />
                <label
                  htmlFor="image"
                  className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed cursor-pointer"
                >
                  <Upload className="h-4 w-4 text-muted-foreground" />
                  <span className="sr-only">Upload</span>
                </label>
              </div>
            )}
          </div>
        </div>

        <Button disabled={isPending} className="w-full flex items-center gap-2">
          {isPending && <Loader className="size-4 animate-spin" />}{" "}
          {isEditMode ? "Edit Product" : "Create Product"}
        </Button>
      </form>
    </Form>
  );
}
