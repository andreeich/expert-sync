import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Icon } from "@/components/icon";

const badgeGroupVariants = cva(
  "inline-flex items-center border font-medium bg-base-white dark:bg-gray-950 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 p-1 pr-2.5 rounded-[0.625rem] hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors",
  {
    variants: {
      size: {
        md: "gap-2 text-xs/xs",
        lg: "gap-2.5 text-sm/sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface BadgeGroupProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof badgeGroupVariants> {
  asChild?: boolean;
}

const BadgeGroup = React.forwardRef<HTMLButtonElement, BadgeGroupProps>(
  ({ className, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(badgeGroupVariants({ size, className }))} ref={ref} {...props}>
        {children}
        <Icon className="w-4 h-4" variant="arrow-right" />
      </Comp>
    );
  },
);
BadgeGroup.displayName = "BadgeGroup";

export { BadgeGroup, badgeGroupVariants };
