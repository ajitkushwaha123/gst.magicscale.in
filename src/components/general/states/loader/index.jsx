import { Loader2 } from "lucide-react";

const Loader = ({ title = "" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100dvh] w-full bg-white dark:bg-[#0a0a1a] gap-4">
      <div className="relative flex items-center justify-center">
        <Loader2 className="relative h-12 w-12 animate-spin text-green-600 dark:text-green-500 z-10" />
      </div>

      <div className="text-center mt-2">
        <h3 className="font-semibold text-lg text-zinc-800 dark:text-zinc-200">{title || "Loading..."}</h3>
      </div>
    </div>
  );
};

export default Loader;
