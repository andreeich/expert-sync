"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { toast } from "sonner";
import { MoreHorizontal, Trash, Unplug } from "lucide-react";

import { Id } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface MenuProps {
  documentId: Id<"documents">;
}

export const Menu = ({ documentId }: MenuProps) => {
  const router = useRouter();
  const { user } = useUser();

  const archive = useMutation(api.documents.archive);
  const removeMember = useMutation(api.documents.removeMember);

  const onArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Document moved to trash!",
      error: "Failed to archive document.",
    });

    router.push("/documents");
  };

  const onRemoveMember = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    if (!documentId) return;
    router.push("/documents");
    // console.log(id, user?.emailAddresses[0].emailAddress!);
    const promise = removeMember({
      id: documentId,
      member: user?.emailAddresses[0].emailAddress!,
    });

    toast.promise(promise, {
      loading: "Disconnection...",
      success: "Disconnected from document.",
      error: "Failed to disconnect from document!.",
    });
  };

  const document = useQuery(api.documents.getById, {
    documentId,
  });

  const isOwner = document?.userId === user?.id;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-60"
        align="end"
        alignOffset={8}
        forceMount
      >
        {isOwner && (
          <DropdownMenuItem onClick={onArchive}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        )}
        {!isOwner && (
          <DropdownMenuItem onClick={onRemoveMember}>
            <Unplug className="h-4 w-4 mr-2" />
            Disconnect
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <div className="text-xs text-muted-foreground p-2">
          Last edited by: {user?.fullName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className="h-10 w-10" />;
};
