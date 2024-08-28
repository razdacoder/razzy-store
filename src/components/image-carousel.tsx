"use client";
import Image from "next/image";
export default function ImageCarousel() {
  return (
    <div className="flex gap-4 flex-col-reverse lg:flex-row">
      <div className="flex flex-row lg:flex-col lg:flex-wrap gap-4">
        <Image
          src="/img1.jpg"
          alt="Product Image"
          width={120}
          height={120}
          className="border-2 p-1 border-black"
        />
        <Image src="/img2.jpg" alt="Product Image" width={120} height={120} />
      </div>
      <div className="flex-1">
        <Image src="/img1.jpg" alt="Product Image" width={500} height={150} />
      </div>
    </div>
  );
}
