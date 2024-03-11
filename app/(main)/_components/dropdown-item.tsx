import React from "react";
import { Icon } from "@/components/icon";

export interface DropdownItemProps {
  title: string;
  icon: string;
  onClick?: () => void;
}

export const DropdownItem = React.forwardRef<
  HTMLButtonElement,
  DropdownItemProps
>(({ title, icon, onClick }: DropdownItemProps) => {
  return (
    <button className="px-1.5 py-0.5 group" onClick={onClick}>
      <div className="flex items-center h-full gap-3 rounded-md w-full px-2.5 py-2 group-hover:bg-gray-50 group-hover:dark:bg-gray-800  transition-colors">
        <Icon variant={icon} className="gray-500 w-4 h-4" />
        <span className="text-sm/sm font-medium text-gray-700 dark:text-gray-300 group-disabled:text-gray-500">
          {title}
        </span>
      </div>
    </button>
  );
});

DropdownItem.displayName = "DropdownItem";
