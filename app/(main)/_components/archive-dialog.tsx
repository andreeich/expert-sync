"use client";

import { Icon } from "@/components/icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useArchiveDialog } from "@/hooks/use-archive-dialog";
import { Id } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface DocumentItemProps {
  title: string;
  onRestore: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onRemove: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DocumentItem = ({
  title,
  onRestore,
  onRemove,
  onClick,
}: DocumentItemProps) => {
  return (
    <div
      onClick={onClick}
      className="flex gap-3 px-2 md:px-6 py-1 my-1 mx-2 items-center justify-between border-b border-gray-200 last:border-b-0 hover:cursor-pointer bg-base-white hover:bg-gray-50 transition-colors rounded-lg "
    >
      <p className="text-sm/sm text-gray-900 font-medium">{title}</p>
      <span className="flex items-center">
        <Button onClick={onRestore} variant="tertiary gray" size="icon-sm">
          <Icon variant="refresh-ccw-01" />
        </Button>
        <Button onClick={onRemove} variant="tertiary gray" size="icon-sm">
          <Icon variant="delete" />
        </Button>
      </span>
    </div>
  );
};

interface ArchiveDialogProps {
  children: React.ReactNode;
}

const ArchiveDialog = ({ children }: ArchiveDialogProps) => {
  const router = useRouter();

  const archiveDialog = useArchiveDialog();

  const archivedDocuments = useQuery(api.documents.getArchivedDocuments);
  const restore = useMutation(api.documents.restoreDocument);
  const remove = useMutation(api.documents.deleteDocument);

  const [search, setSearch] = useState("");

  const onRestore = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: Id<"documents">
  ) => {
    event.stopPropagation();

    const promise = restore({ id });

    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored successfully!",
      error: "Failed to restore document.",
    });
  };

  const onRemove = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: Id<"documents">
  ) => {
    event.stopPropagation();

    const promise = remove({ id });

    toast.promise(promise, {
      loading: "Deleting document...",
      success: "Document deleted successfully!",
      error: "Failed to delete document.",
    });
  };

  const onClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: Id<"documents">
  ) => {
    event.stopPropagation();
    archiveDialog.onClose();
    router.push(`/documents/${id}`);
  };

  return (
    <Dialog open={archiveDialog.isOpen} onOpenChange={archiveDialog.onToggle}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <header className="space-y-2 px-4 md:px-8 pt-4 md:pt-8">
          <h3 className="text-display-xs/display-xs md:text-display-sm/display-sm font-semibold tracking-tight text-gray-900">
            Trash Documents
          </h3>
          <p className="text-md/md md:text-sm/sm text-gray-600">
            Restore or delete documents from the trash.
          </p>
        </header>
        <main>
          <section className="px-4 md:px-8 py-3 flex items-center">
            <Input
              placeholder="Search"
              className="z-[5] w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </section>
          <hr className="text-gray-200 my-1" />
          <ScrollArea className="w-full h-[13rem]">
            {archivedDocuments?.length ? (
              archivedDocuments
                ?.filter((document) => document.title.includes(search))
                .map((document) => (
                  <DocumentItem
                    key={document._id}
                    title={document.title}
                    onRestore={(e) => onRestore(e, document._id)}
                    onRemove={(e) => onRemove(e, document._id)}
                    onClick={(e) => onClick(e, document._id)}
                  />
                ))
            ) : (
              <div className="flex items-center px-4 md:px-8 py-2 h-[3.25rem]">
                <p className="text-sm/sm text-gray-900 font-medium">
                  No documents found
                </p>
              </div>
            )}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </main>
      </DialogContent>
    </Dialog>
  );
};

export { ArchiveDialog };
