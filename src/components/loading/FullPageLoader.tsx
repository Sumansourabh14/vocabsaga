import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export type FullPageLoaderProps = {
  label?: string;
  className?: string;
};

const FullPageLoader = ({ label, className }: FullPageLoaderProps) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn("min-h-screen w-full grid place-items-center", className)}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin" aria-hidden="true" />
        {label ? <p className="text-sm tracking-tight">{label}</p> : null}
        <span className="sr-only">Loading</span>
      </div>
    </div>
  );
};

export default FullPageLoader;
