import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <main className="py-4 my-10">
      <div className="px-4 md:container flex justify-center items-center my-24">
        <Loader className="size-5 animate-spin" />
      </div>
    </main>
  );
}
