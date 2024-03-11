import React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";

export interface MemberItemProps {
  email: string;
  onRemove: () => void;
}

export const MemberItem = ({ email, onRemove }: MemberItemProps) => {
  return (
    <div className="flex gap-3 px-4 py-2 items-center justify-between border-b border-gray-200 dark:border-gray-800 last:border-b-0">
      <p className="text-sm/sm text-gray-900 dark:text-gray-50 font-medium">
        {email}
      </p>
      <Button onClick={onRemove} variant="tertiary gray" size="icon-sm">
        <Icon variant="delete" />
      </Button>
    </div>
  );
};
