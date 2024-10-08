"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
export default function ImageCarousel({ images }: { images: string[] }) {
  const [activeImg, setActiveImg] = useState(0);
  return (
    <div className="flex gap-4 flex-col-reverse lg:flex-row">
      <div className="flex flex-row justify-between lg:justify-start lg:flex-col lg:flex-wrap gap-4">
        {images.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt="Product Image"
            width={100}
            height={100}
            className={cn(
              "transition-all w-[120px]",
              activeImg === index && "border-2 p-1 border-black "
            )}
            onClick={() => setActiveImg(index)}
          />
        ))}
      </div>
      <div className="flex-1">
        <Image
          src={images[activeImg]}
          alt="Product Image"
          width={500}
          height={150}
          className="transition-all h-[600px] lg:h-[750px]"
        />
      </div>
    </div>
  );
}
