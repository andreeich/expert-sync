import React, { useRef, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MessageItem } from "./message-item";
import { Spinner } from "@/components/spinner";

interface ChatProps {
  documentId: Id<"documents">;
}

export const Chat = ({ documentId }: ChatProps) => {
  const messageRef = useRef<HTMLInputElement>(null);
  const [isSending, setIsSending] = useState(false);

  const sendMessage = useMutation(api.messages.sendMessages);
  const getMessages = useQuery(api.messages.getMessagesByDocument, {
    documentId,
  });

  const onSend = () => {
    if (messageRef.current?.value) {
      setIsSending(true);

      const promise = sendMessage({
        documentId,
        content: messageRef.current.value,
      }).then(() => {
        messageRef.current!.value = "";
        setIsSending(false);
      });
    }
  };

  return (
    <Popover>
      <Button variant="secondary" size="icon-sm" asChild>
        <PopoverTrigger>
          <Icon variant="message-circle-01" />
        </PopoverTrigger>
      </Button>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[375px] max-w-[calc(100vw_-_32px)] p-0"
      >
        <ScrollArea className="w-full h-[13rem]">
          <div className="p-4 space-y-4">
            {getMessages?.length ? (
              getMessages?.map((member) => (
                <MessageItem
                  key={member._id}
                  name={member.user?.fullName || "Anonymous"}
                  avatarUrl={member.user?.avatarUrl}
                  content={member.content}
                />
              ))
            ) : (
              <div className="flex items-center h-10">
                <p className="text-sm/sm text-gray-900 font-medium">
                  No messages yet
                </p>
              </div>
            )}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        <hr className="text-gray-200" />
        <section className="px-4 py-3 flex items-center">
          <Input
            ref={messageRef}
            placeholder="Message"
            className="rounded-r-none z-[5] w-full"
          />
          <Button
            variant="secondary"
            className="h-[44px] rounded-l-none border-l-0 z-[0]"
            onClick={onSend}
            disabled={isSending}
          >
            {isSending ? <Spinner /> : <Icon variant="send-03" />}
          </Button>
        </section>
      </PopoverContent>
    </Popover>
  );
};
