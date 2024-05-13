import React, { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { MessageItem, RepliedMessageItem } from "./message-item";
import { Spinner } from "@/components/spinner";
import { Skeleton } from "@/components/ui/skeleton";

interface ParentMessage {
  id: Id<"messages">;
  name: string;
  content: string;
}

interface ChatProps {
  documentId: Id<"documents">;
}

export const Chat = ({ documentId }: ChatProps) => {
  const messageRef = useRef<HTMLInputElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [parentMessage, setParentMessage] = useState<ParentMessage>();

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
        parentMessageId: parentMessage?.id,
      }).then(() => {
        messageRef.current!.value = "";
        setIsSending(false);
        onClearReply();
      });
    }
  };

  const onReply = (id: Id<"messages">, name: string, content: string) => {
    setParentMessage({
      id,
      name,
      content,
    });
  };

  const onClearReply = () => {
    setParentMessage(undefined);
  };

  // useEffect(() => {
  //   const down = (e: KeyboardEvent) => {
  //     if (e.key === "Enter") {
  //       e.preventDefault();
  //       onSend();
  //     }
  //   };

  //   document.addEventListener("keydown", down);
  //   return () => document.removeEventListener("keydown", down);
  // }, []);

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
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <ScrollArea className="w-full h-[13rem]">
          <div className="p-4 space-y-4">
            {getMessages?.length ? (
              getMessages?.map((member, key) => {
                return member.parentMessage ? (
                  <MessageItem
                    key={key}
                    id={member._id}
                    name={member.user?.name || "Anonymous"}
                    avatarUrl={member.user?.picture}
                    content={member.content}
                    parentMessage={{
                      id: member.parentMessage._id,
                      name: member.parentMessage?.user?.name || "Anonymous",
                      content: member.parentMessage.content,
                    }}
                    onReply={onReply}
                  />
                ) : (
                  <MessageItem
                    key={key}
                    id={member._id}
                    name={member.user?.name || "Anonymous"}
                    avatarUrl={member.user?.picture}
                    content={member.content}
                    onReply={onReply}
                  />
                );
              })
            ) : (
              <div className="flex items-center h-10">
                <p className="text-sm/sm text-gray-900 dark:text-gray-50 font-medium">
                  No messages yet
                </p>
              </div>
            )}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
        <hr className="border-gray-200 dark:border-gray-800" />
        {parentMessage && (
          <section className="px-4 pt-3 flex items-center relative group">
            <RepliedMessageItem name={parentMessage.name} content={parentMessage.content} />
            <Button
              variant="tertiary gray"
              size="icon-xs"
              className="absolute top-3 right-4 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all"
              onClick={onClearReply}
            >
              <Icon variant="x-close" className="w-4 h-4" />
            </Button>
          </section>
        )}
        <section className="px-4 py-3 flex items-center">
          <Input ref={messageRef} placeholder="Message" className="rounded-r-none z-[5] w-full" />
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

Chat.Skeleton = function ChatSkeleton() {
  return <Skeleton className="w-10 h-10 rounded-lg" />;
};
