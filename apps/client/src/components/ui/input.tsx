import * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  value,
  ...props
}: React.ComponentProps<"input">) {
  const hasValue =
    value !== undefined && value !== null && String(value).length > 0;

  return (
    <input
      type={type}
      value={value}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow,transform] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:scale-103 hover:bg-blue-100",
        hasValue && "bg-blue-200 ring-2 ring-blue-500",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
