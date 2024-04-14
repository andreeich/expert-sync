import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center border font-medium bg-base-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 rounded-md",
  {
    variants: {
      size: {
        sm: "px-1.5 py-0.5 text-xs/xs gap-1",
        md: "px-2 py-0.5 text-sm/sm gap-1",
        lg: "px-3 py-1 text-sm/sm gap-1.5",
      },
    },
    defaultVariants: {
      size: "sm",
    },
  },
);

const dotVariants = cva("w-2 h-2 rounded-full", {
  variants: {
    variant: {
      gray: "bg-gray-500",
      success: "bg-success-500",
      error: "bg-error-500",
    },
  },
  defaultVariants: {
    variant: "gray",
  },
});

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants>,
    VariantProps<typeof dotVariants> {}

function Badge({ className, size, variant, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ size }), className)} {...props}>
      <div className={cn(dotVariants({ variant }))}></div>
      {children}
    </div>
  );
}

export { Badge, badgeVariants };
