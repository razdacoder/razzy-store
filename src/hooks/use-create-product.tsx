import { createProduct } from "@/lib/actions";
import { ProductValues } from "@/lib/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useCreateProduct() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (values: ProductValues) => createProduct(values),
    onSuccess: () => {
      toast.success("Product Created");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      console.log(error);
      toast.error("Something went wrong!!");
    },
  });
  return { mutate, isPending };
}
