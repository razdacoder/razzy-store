import { updateProduct } from "@/lib/actions";
import { ProductValues } from "@/lib/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useUpdateProduct({ slug }: { slug?: string }) {
  const queryClient = useQueryClient();
  const { mutate: updateProductFn, isPending: isUpdating } = useMutation({
    mutationFn: (updatedValues: ProductValues) =>
      updateProduct(slug!, updatedValues),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", slug!] });
      toast.success("Product updated");
    },
    onError: () => {
      toast.error("Something went wromg!!");
    },
  });
  return { updateProductFn, isUpdating };
}
