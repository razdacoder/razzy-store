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
import { useEditProduct } from "@/hooks/use-edit-product";
import { useNewProduct } from "@/hooks/use-new-product";
import useUpdateProduct from "@/hooks/use-update-product";
import { Product } from "@/lib/types";
import { uploadFiles } from "@/lib/uploadthing";
import { Loader, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { ClientUploadedFileData } from "uploadthing/types";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

interface ProductFormProps {
  product?: Product;
}

export default function ProductForm({ product }: ProductFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();
  const { onClose } = useNewProduct();
  const { onClose: closeEdit } = useEditProduct();
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
          images: product.images,
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
  const { updateProductFn } = useUpdateProduct({ slug: product?.slug });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles((prevFiles) => [...prevFiles, e.target.files![0]]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleRemoveImage = (image: string) => {
    const currentImages = form.getValues("images");
    form.setValue(
      "images",
      currentImages.filter((i) => i !== image),
      {
        shouldDirty: true,
      }
    );
    form.trigger("images");
  };

  const onSubmit = async (values: ProductValues) => {
    if (isEditMode) {
      startTransition(async () => {
        let res: ClientUploadedFileData<{ uploadedBy: string }>[] = [];
        if (files.length > 0) {
          res = await uploadFiles("imageUploader", { files });
        }
        const newImages = res.map((r) => r.url);
        updateProductFn(
          { ...values, images: [...values.images, ...newImages] },
          {
            onSuccess: () => closeEdit(),
          }
        );
      });
    } else {
      startTransition(async () => {
        if (files.length > 0) {
          const res = await uploadFiles("imageUploader", { files });
          const images = res.map((r) => r.url);
          mutate(
            { ...values, images },
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
  };

  const renderImagePreview = (image: string) => (
    <div className="relative" key={image}>
      <Image
        src={image}
        alt="Uploaded Image"
        className="aspect-square w-full rounded-md object-cover"
        height="300"
        width="300"
      />
      <Button
        type="button"
        onClick={() => handleRemoveImage(image)}
        size="icon"
        className="rounded-full absolute right-1 top-1 size-6"
      >
        <X className="size-4" />
      </Button>
    </div>
  );

  const renderFilePreview = (file: File, index: number) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <div className="relative" key={`${file.name}-${index}`}>
        <Image
          src={imageUrl}
          alt="Uploaded File"
          className="aspect-square w-full rounded-md object-cover"
          height="300"
          width="300"
        />
        <Button
          type="button"
          onClick={() => handleRemoveFile(index)}
          size="icon"
          className="rounded-full absolute right-1 top-1 size-6"
        >
          <X className="size-4" />
        </Button>
      </div>
    );
  };

  const renderUploadInput = () => (
    <div>
      <input
        className="hidden"
        onChange={handleFileChange}
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
  );

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
        ></FormField>
        <FormField
          name="category"
          control={form.control}
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
            {isEditMode && form.getValues("images").map(renderImagePreview)}
            {files.map((file, index) => renderFilePreview(file, index))}
            {form.getValues("images").length + files.length < 3 &&
              renderUploadInput()}
          </div>
        </div>
        <Button disabled={isPending} className="w-full flex items-center gap-2">
          {isPending && <Loader className="size-4 animate-spin" />}
          {isEditMode ? "Edit Product" : "Create Product"}
        </Button>
      </form>
    </Form>
  );
}
