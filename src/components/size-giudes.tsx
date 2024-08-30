import { sizes } from "@/lib/config";
import { Button } from "./ui/button";

export default function SizeGuides() {
  return (
    <div className="flex gap-3 items-center">
      {sizes.map((size) => (
        <Button
          key={size}
          variant="outline"
          size="icon"
          className="border-2 border-black"
        >
          {size}
        </Button>
      ))}
    </div>
  );
}
