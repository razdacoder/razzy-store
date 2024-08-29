import { Product } from "@/lib/types";
import { formatToNaira } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Link href={`/products/gfdggf`}>
      <div className="relative h-[480px]">
        <Image
          src={product.images[1]}
          alt={product.title}
          fill
          className="absolute object-cover"
        />
      </div>
      <div className="mt-4 space-y-2">
        <h6 className="text-sm font-medium uppercase">{product.title}</h6>
        <h5 className="font-medium text-sm tracking-wide">
          {formatToNaira(product.price)}
        </h5>
      </div>
    </Link>
  );
}
