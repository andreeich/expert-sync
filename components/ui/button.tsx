import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all outline-none disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "text-base-white border border-brand-600 bg-brand-600 shadow-xs hover:border-brand-700 hover:bg-brand-700 focus-visible:shadow-ring-brand-xs disabled:text-gray-400 disabled:bg-gray-100 disabled:border-gray-200 dark:disabled:border-gray-700 dark:disabled:border-gray-800",
        secondary:
          "text-gray-700 border border-gray-200 bg-base-white shadow-xs hover:text-gray-800 hover:bg-gray-50 focus-visible:shadow-ring-gray-xs disabled:text-gray-400 disabled:bg-base-white disabled:border-gray-200 dark:text-gray-300 dark:hover:text-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-800",
        "secondary color":
          "text-brand-700 border border-brand-300 bg-brand-50 shadow-xs hover:text-brand-800 hover:bg-brand-100 focus-visible:shadow-ring-brand-xs disabled:text-gray-400 disabled:bg-base-white disabled:border-gray-200 dark:text-gray-300 dark:hover:text-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800 dark:border-gray-800",
        "tertiary gray":
          "text-gray-600 hover:bg-gray-50 disabled:text-gray-400 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-800",
        "tertiary color":
          "text-brand-700 hover:text-brand-800 hover:bg-gray-50 disabled:text-gray-400 dark:text-gray-300 dark:hover:text-gray-100 dark:bg-gray-900 dark:hover:bg-gray-800",
        "destructive primary":
          "text-base-white border border-error-600 bg-error-600 shadow-xs hover:border-error-700 hover:bg-error-700 focus-visible:shadow-ring-error-xs disabled:text-gray-400 disabled:bg-gray-100 disabled:border-gray-200 dark:disabled:border-gray-700 dark:disabled:border-gray-800",
        "destructive tertiary":
          "text-error-700 hover:text-error-800 disabled:text-gray-400 dark:text-error-300 dark:hover:text-error-200",
        "link gray":
          "text-gray-600 hover:text-gray-700 disabled:text-gray-400 dark:text-error-400 dark:hover:text-error-300",
        "warning primary":
          "text-base-white border border-warning-600 bg-warning-600 shadow-xs hover:border-warning-700 hover:bg-warning-700 focus-visible:shadow-ring-gray-xs disabled:text-gray-400 disabled:bg-gray-100 disabled:border-gray-200 dark:disabled:border-gray-700 dark:disabled:border-gray-800",
      },
      size: {
        sm: "text-sm/sm px-3 py-2 gap-1",
        md: "text-sm/sm px-3 py-2.5 gap-1",
        lg: "text-md/md px-4 py-2.5 gap-1.5",
        xl: "text-md/md px-[1.125rem] py-3 gap-1.5",
        "2xl": "text-lg/lg px-[1.375rem] py-4 gap-2.5",
        "link-sm": "text-sm/sm gap-1",
        "link-md": "text-sm/sm gap-1",
        "link-lg": "text-md/md gap-1.5",
        "link-xl": "text-md/md gap-1.5",
        "link-2xl": "text-lg/lg gap-2.5",
        "icon-xs": "p-1",
        "icon-sm": "p-2",
        "icon-md": "p-2.5",
        "icon-lg": "p-3",
        "icon-xl": "p-3.5",
        "icon-2xl": "p-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "sm",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
