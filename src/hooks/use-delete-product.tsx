import { deleteProduct } from "@/lib/actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useDeleteProduct() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: deleteProductFn, isPending } = useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onError: (error) => {
      console.log(error.message);
      toast.error("Something went wrong!!");
    },
    onSuccess: () => {
      toast.success("Product deleted");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/");
    },
  });
  return { deleteProductFn, isPending };
}
