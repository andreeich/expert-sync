"use client";

import { Doc } from "@/convex/_generated/dataModel";
import {
  PopoverTrigger,
  Popover,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Trash, Users } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { z } from "zod";

interface MembersProps {
  initialData: Doc<"documents">;
}

export const Members = ({ initialData }: MembersProps) => {
  const members = initialData.members;
  // ref for the input
  const inputRef = useRef<HTMLInputElement>(null);
  const [newMember, setNewMember] = useState("");
  const [addingMember, setAddingMember] = useState(false);

  const addMember = useMutation(api.documents.addMember);
  const removeMember = useMutation(api.documents.removeMember);
  const inputSchema = z.coerce.string().email();

  const onAddNewMember = () => {
    if (newMember === "") return;

    setAddingMember(true);

    if (inputSchema.safeParse(newMember).success) {
      const promise = addMember({
        id: initialData._id,
        member: newMember,
      });

      toast.promise(promise, {
        loading: "Adding member...",
        success: "Member added",
        error: "Failed to add member.",
      });

      setNewMember("");
      setAddingMember(false);
    } else {
      toast.error("Invalid email address.");
      setAddingMember(false);
      const classes = ["ring-2", "ring-red-500/25"];
      inputRef.current?.classList.add(...classes);

      setTimeout(() => {
        inputRef.current?.classList.remove(...classes);
      }, 500);
    }
  };

  const onRemoveMember = (member: string) => {
    setAddingMember(true);

    const promise = removeMember({
      id: initialData._id,
      member,
    });

    toast.promise(promise, {
      loading: "Removing member...",
      success: "Member removed",
      error: "Failed to remove member.",
    });

    setAddingMember(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="ghost">
          Members
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72" align="end" alignOffset={8} forceMount>
        <div className="flex flex-col items-center justify-center">
          <Users className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-sm font-medium mb-2">
            Add member to this document
          </p>
          <span className="text-xs text-muted-foreground mb-4">
            Edit this document together with others.
          </span>
          <Input
            ref={inputRef}
            value={newMember}
            placeholder="Email address"
            onChange={(e) => setNewMember(e.target.value)}
            className="h-7 px-2 focus-visible:ring-transparent mb-2 text-xs w-full transition-all"
          ></Input>
          <Button
            className="w-full text-xs"
            size="sm"
            disabled={addingMember}
            onClick={onAddNewMember}
          >
            Add member
          </Button>
          {!!members?.length && (
            <ScrollArea className="w-full text-xs mt-4 h-[200px] rounded-sm border">
              <div className="px-3 space-y-2 py-2">
                {members?.map((member: string) => (
                  <div
                    key={member}
                    className="flex items-center gap-x-2 justify-between py-1 w-full"
                  >
                    <div>
                      <Users className="h-4 w-4" />
                      <p className="truncate w-[185px]">{member}</p>
                    </div>
                    <div>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={(e) => onRemoveMember(member)}
                        className="inline-flex items-center justify-center w-8 h-8"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
