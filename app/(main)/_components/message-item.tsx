import React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import Image from "next/image";
import { Id } from "@/convex/_generated/dataModel";

export interface MessageItemProps {
  id: Id<"messages">;
  name: string;
  content: string;
  avatarUrl?: string;
  parentMessage?: MessageItemProps;
  onReply?: (id: Id<"messages">, name: string, content: string) => void;
}

export const RepliedMessageItem = ({ name, content }: { name: string; content: string }) => (
  <div className="w-fit flex gap-1.5">
    <Icon variant="corner-up-right" className="w-4 h-6 text-gray-500" />
    <div className="w-fit">
      <p className="text-sm/sm text-gray-500 font-semibold w-fit  hyphens-auto">{name}</p>
      <p className="text-sm/sm text-gray-400 dark:text-gray-600 w-fit  hyphens-auto">{content}</p>
    </div>
  </div>
);

export const MessageItem = ({
  id,
  name,
  content,
  avatarUrl,
  parentMessage,
  onReply,
}: MessageItemProps) => {
  return (
    <div className="flex gap-3 items-start relative group">
      <Image
        className="rounded-full"
        src={avatarUrl || "/avatar-placeholder.svg"}
        alt="Avatar"
        width={40}
        height={40}
      />
      <div className="w-fit">
        {parentMessage && (
          <RepliedMessageItem name={parentMessage.name} content={parentMessage.content} />
        )}
        <div className="w-fit">
          <p className="text-sm/sm text-gray-700 dark:text-gray-300 font-semibold w-fit  hyphens-auto">
            {name}
          </p>
          <p className="text-sm/sm text-gray-600 dark:text-gray-400 w-fit  hyphens-auto">
            {content}
          </p>
        </div>
      </div>
      {onReply && (
        <Button
          variant="tertiary gray"
          size="icon-xs"
          className="absolute top-0 right-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all"
          onClick={() => onReply(id, name, content)}
        >
          <Icon variant="corner-up-left" className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
};
