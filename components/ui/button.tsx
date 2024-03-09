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
          "text-base-white border border-brand-600 bg-brand-600 shadow-xs hover:border-brand-700 hover:bg-brand-700 focus-visible:shadow-ring-brand-xs disabled:text-gray-400 disabled:bg-gray-100 disabled:border-gray-200",
        secondary:
          "text-gray-700 border border-gray-200 bg-base-white shadow-xs hover:text-gray-800 hover:bg-gray-50 focus-visible:shadow-ring-gray-xs disabled:text-gray-400 disabled:bg-base-white disabled:border-gray-200",
        "secondary color":
          "text-brand-700 border border-brand-300 bg-brand-50 shadow-xs hover:text-brand-800 hover:bg-brand-100 focus-visible:shadow-ring-brand-xs disabled:text-gray-400 disabled:bg-base-white disabled:border-gray-200",
        "tertiary gray":
          "text-gray-600 hover:bg-gray-50 disabled:text-gray-400",
        "tertiary color":
          "text-brand-700 hover:text-brand-800 hover:bg-gray-50 disabled:text-gray-400",
      },
      size: {
        sm: "text-sm/sm px-3 py-2 gap-1",
        md: "text-sm/sm px-3 py-2.5 gap-1",
        lg: "text-md/md px-4 py-2.5 gap-1.5",
        xl: "text-md/md px-[1.125rem] py-3 gap-1.5",
        "2xl": "text-lg/lg px-[1.375rem] py-4 gap-2.5",
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
  }
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
