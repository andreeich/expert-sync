import React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import Image from "next/image";

export interface MessageItemProps {
  name: string;
  content: string;
  avatarUrl?: string;
}

export const MessageItem = ({ name, content, avatarUrl }: MessageItemProps) => {
  return (
    <div className="flex gap-3 items-start">
      <Image
        className="rounded-full"
        src={avatarUrl || "/avatar-placeholder.svg"}
        alt="Avatar"
        width={40}
        height={40}
      />
      <div className="w-fit">
        <p className="text-sm/sm text-gray-700 dark:text-gray-300 font-semibold w-fit  hyphens-auto">
          {name}
        </p>
        <p className="text-sm/sm text-gray-600 dark:text-gray-400 w-fit  hyphens-auto">
          {content}
        </p>
      </div>
    </div>
  );
};
