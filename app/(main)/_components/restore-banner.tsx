import { Id, Doc } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useEditor } from "@/hooks/use-editor";
import { PartialBlock } from "@blocknote/core";

interface RestoreBannerProps {
  documentId: Id<"documents">;
  createdBy: string;
  timestamp: number;
  content: string;
}

export const RestoreBanner = ({
  documentId,
  createdBy,
  timestamp,
  content,
}: RestoreBannerProps) => {
  const router = useRouter();
  const Editor = useEditor();

  const updateContent = useMutation(api.documents.updateDocumentContent);

  const date = new Date(timestamp);

  const onRestore = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();

    const promise = updateContent({ id: documentId, content }).then(() => {
      Editor.init(JSON.parse(content) as PartialBlock[]);
    });

    toast.promise(promise, {
      loading: "Restoring document...",
      success: "Document restored successfully!",
      error: "Failed to restore document.",
    });

    router.push(`/documents/${documentId}`);
  };

  return (
    <article className="bg-warning-50 dark:bg-warning-950 pl-7 pr-5 md:px-[54px] py-4 flex items-center justify-between gap-4 border-b border-warning-200 dark:border-warning-800">
      <div className="space-y-1.5">
        <p className="text-warning-700 dark:text-warning-300 font-semibold text-md/md md:text-lg/lg">
          Saved by {createdBy}
        </p>
        <p className="text-warning-500 text-xs/xs md:text-sm/sm">{date.toDateString()}</p>
      </div>
      <span className="flex items-center gap-3">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="warning primary">Restore</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to go back to this version?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={(e) => onRestore(e)}>Restore</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </span>
    </article>
  );
};
