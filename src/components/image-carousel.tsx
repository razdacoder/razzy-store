"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
export default function ImageCarousel({ images }: { images: string[] }) {
  const [activeImg, setActiveImg] = useState<string>(images[0]);
  return (
    <div className="flex gap-4 flex-col-reverse lg:flex-row">
      <div className="flex flex-row lg:flex-col lg:flex-wrap gap-4">
        {images.map((image) => (
          <Image
            src={image}
            alt="Product Image"
            width={100}
            height={100}
            className={cn(activeImg === image && "border-2 p-1 border-black")}
            onClick={() => setActiveImg(image)}
          />
        ))}
      </div>
      <div className="flex-1">
        <Image src={activeImg} alt="Product Image" width={500} height={150} />
      </div>
    </div>
  );
}
