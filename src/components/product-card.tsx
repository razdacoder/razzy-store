import { formatToNaira } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard() {
  return (
    <Link href={`/products/gfdggf`}>
      <div className="relative h-[480px]">
        <Image
          src="/img1.jpg"
          alt="Product Image"
          fill
          className="absolute object-cover"
        />
      </div>
      <div className="mt-4 space-y-2">
        <h6 className="text-sm font-medium uppercase">Online Exclusive</h6>
        <h5 className="font-medium text-sm tracking-wide">
          {formatToNaira(40000)}
        </h5>
      </div>
    </Link>
  );
}
