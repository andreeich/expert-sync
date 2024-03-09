import * as React from "react";

import { cn } from "@/lib/utils";
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leadingIcon, onChange, label, hint, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full text-start">
        {label && (
          <label className="text-sm/sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div
          className={cn(
            "flex items-center py-2.5 px-3.5 gap-2 w-80 h-11 bg-base-white border border-gray-300 shadow-xs rounded-lg  focus-visible:outline-none has-[:focus-visible]:shadow-ring-brand-xs has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-gray-50 disabled:text-gray-500 disabled:placeholder:text-gray-500 transition-all",
            className
          )}
        >
          {leadingIcon ? leadingIcon : null}
          <input
            type={type}
            className={cn(
              // "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              "w-full  text-md/md placeholder:text-gray-500 text-gray-900 outline-none  disabled:text-gray-500 disabled:placeholder:text-gray-500 transition-all"
            )}
            ref={ref}
            onChange={onChange}
            {...props}
          />
        </div>
        {hint && <span className="text-sm/sm text-gray-600">{hint}</span>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
