import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="w-full flex  items-center gap-4 h-screen justify-center p-4">
      <Loader size={32} className="animate-spin ease-in-out duration-1000" />
    </div>
  );
}
