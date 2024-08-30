import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <div className="vertical-center gap-[1.875rem]">
        <Loader2 className="size-5 animate-spin" />
      </div>
    </main>
  );
};

export default Loading;
