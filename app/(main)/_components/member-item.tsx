import React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import Image from "next/image";

export interface MemberItemProps {
  name: string;
  email: string;
  avatarUrl?: string;
  onRemove: () => void;
}

export const MemberItem = ({
  name,
  email,
  avatarUrl,
  onRemove,
}: MemberItemProps) => {
  return (
    <>
      {/* <div className="flex gap-3 px-4 py-2 items-center justify-between border-b border-gray-200 dark:border-gray-800 last:border-b-0">
        <p className="text-sm/sm text-gray-900 dark:text-gray-50 font-medium">
          {email}
        </p>
        <Button onClick={onRemove} variant="tertiary gray" size="icon-sm">
          <Icon variant="delete" />
        </Button>
      </div> */}
      <div className="flex gap-3 px-4 py-2 items-center justify-start border-b border-gray-200 dark:border-gray-800 last:border-b-0">
        <Image
          className="rounded-full"
          src={avatarUrl || "/avatar-placeholder.svg"}
          alt="Avatar"
          width={40}
          height={40}
        />
        <div className="flex flex-1 justify-between items-center">
          <div className="w-fit">
            <p className="text-sm/sm text-gray-700 dark:text-gray-300 font-semibold w-fit break-words line-clamp-1">
              {name}
            </p>
            <p className="text-sm/sm text-gray-600 dark:text-gray-400 w-fit break-words line-clamp-1">
              {email}
            </p>
          </div>
          <Button onClick={onRemove} variant="tertiary gray" size="icon-sm">
            <Icon variant="delete" />
          </Button>
        </div>
      </div>
    </>
  );
};
