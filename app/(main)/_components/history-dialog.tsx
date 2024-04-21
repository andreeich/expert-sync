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
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { useHistoryDialog } from "@/hooks/use-history-dialog";
import { Id } from "@/convex/_generated/dataModel";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useHistoryUpdate } from "@/hooks/use-history-update";

interface DocumentItemProps {
  title: string;
  subtitle?: string;
  onRestore?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onRemove?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const DocumentItem = ({ title, subtitle, onRestore, onRemove, onClick }: DocumentItemProps) => {
  return (
    <div
      onClick={onClick}
      className="flex gap-3 px-2 md:px-6 py-1 my-1 mx-2 items-center justify-between border-b border-gray-200 dark:border-gray-800 last:border-b-0 hover:cursor-pointer bg-base-white dark:bg-gray-950 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors rounded-lg "
    >
      <div>
        <p className="text-sm/sm text-gray-900 dark:text-gray-50 font-medium">{title}</p>
        {subtitle && <p className="text-xs/xs text-gray-600 dark:text-gray-400">{subtitle}</p>}
      </div>
      <span className="flex items-center space-x-1">
        {onRestore && (
          <Button onClick={onRestore} variant="tertiary gray" size="icon-sm">
            <Icon variant="refresh-ccw-01" />
          </Button>
        )}
        {onRemove && (
          <Button onClick={onRemove} variant="tertiary gray" size="icon-sm">
            <Icon variant="delete" />
          </Button>
        )}
      </span>
    </div>
  );
};

interface HistoryDialogProps {
  children: React.ReactNode;
  documentId: Id<"documents">;
}

const HistoryDialog = ({ children, documentId }: HistoryDialogProps) => {
  const router = useRouter();

  const historyDialog = useHistoryDialog();
  const historyUpdate = useHistoryUpdate();

  const documentHistory = useQuery(api.documentHistory.getAllDocumentHistoryById, {
    documentId,
  });
  const updateContent = useMutation(api.documents.updateDocumentContent);

  const params = useParams();

  const [search, setSearch] = useState("");

  const onRestore = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, content: string) => {
    event.stopPropagation();

    const promise = updateContent({ id: documentId, content });

    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Refresh the page to apply changes!",
      // success: "Document restored successfully!",
      error: "Failed to restore document.",
    });

    historyDialog.onClose();
    // router.refresh();
    // toast.info("If you want changes to be applied, reload the page.");
    // router.replace(`/documents`);
    // router.replace(`/documents/${documentId}`);
    // router.push(`/documents/${documentId}`);
  };

  const onClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: Id<"documentHistory">,
  ) => {
    event.stopPropagation();
    historyDialog.onClose();
    router.push(`/documents/history/${id}`);
  };

  return (
    <Dialog open={historyDialog.isOpen} onOpenChange={historyDialog.onToggle}>
      <Tooltip>
        <TooltipTrigger>
          <DialogTrigger asChild>{children}</DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>History</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
        onCloseAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <header className="space-y-2 px-4 md:px-8 pt-4 md:pt-8">
          <h3 className="text-display-xs/display-xs md:text-display-sm/display-sm font-semibold tracking-tight text-gray-900 dark:text-gray-50">
            Document History
          </h3>
          <p className="text-md/md md:text-sm/sm text-gray-600 dark:text-gray-400">
            View and restore <b>last 6</b> versions of your document <br />
            <i>(Note: Restoring will overwrite the current document)</i>
          </p>
        </header>
        <main>
          {/* <section className="px-4 md:px-8 py-3 flex items-center">
            <Input
              placeholder="Search"
              className="z-[5] w-full"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </section> */}
          <hr className="border-gray-200 dark:border-gray-800" />
          <ScrollArea className="w-full h-[13rem]">
            {documentHistory?.length ? (
              documentHistory.map((document) => (
                <DocumentItem
                  key={document._id}
                  title={document.createdBy}
                  subtitle={new Date(document.timestamp).toLocaleString()}
                  onRestore={(e) => onRestore(e, document.content)}
                  onClick={(e) => onClick(e, document._id)}
                />
              ))
            ) : (
              <div className="flex items-center px-4 md:px-8 py-2 h-[3.25rem]">
                <p className="text-sm/sm text-gray-900 dark:text-gray-50 font-medium">
                  No history found
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

export { HistoryDialog };
