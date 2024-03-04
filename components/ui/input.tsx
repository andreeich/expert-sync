import * as React from "react";

import { cn } from "@/lib/utils";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leadingIcon, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center py-2.5 px-3.5 gap-2 w-80 h-11 bg-base-white border-gray-300 shadow-xs rounded-lg  focus-visible:outline-none has-[:focus-visible]:shadow-ring-brand-xs has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-gray-50 disabled:text-gray-500 disabled:placeholder:text-gray-500",
          className
        )}
      >
        {leadingIcon ? leadingIcon : null}
        <input
          type={type}
          className={cn(
            // "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "w-full  text-md/md placeholder:text-gray-500 text-gray-900 focus-visible:outline-none  disabled:text-gray-500 disabled:placeholder:text-gray-500"
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
