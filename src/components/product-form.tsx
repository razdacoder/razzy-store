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
import { UploadDropzone } from "@/lib/uploadthing";
import { Loader } from "lucide-react";
import { toast } from "sonner";
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
import { Textarea } from "./ui/textarea";

export default function ProductForm() {
  const form = useForm<ProductValues>({
    resolver: zodResolver(productScheme),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      images: [],
      price: 0,
    },
  });

  const { mutate, isPending } = useCreateProduct();

  function onSubmit(values: ProductValues) {
    mutate(values);
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
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={`form-category-${category}`}
                      value={category}
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
        <UploadDropzone
          className="border-2 border-dashed border-secondary text-primary ut-button:ut-readying:bg-primary/80 ut-button:ut-ready:bg-primary ut-label:text-primary"
          endpoint="imageUploader"
          disabled={isPending}
          onUploadBegin={() => {
            toast.loading("Uploading files...");
          }}
          onClientUploadComplete={(res) => {
            toast.dismiss();
            toast.success("Upload Completed");
            const images = res.map((r) => r.url);
            form.setValue("images", images);
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            toast.dismiss();
            toast.error(`ERROR! ${error.message}`);
          }}
        />

        <Button className="w-full flex items-center gap-2">
          {isPending && <Loader className="size-4" />}Create Product
        </Button>
      </form>
    </Form>
  );
}
