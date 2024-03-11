import { Id, Doc } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
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

interface BannerProps {
  documentId: Id<"documents">;
}

export const Banner = ({ documentId }: BannerProps) => {
  const router = useRouter();

  const restore = useMutation(api.documents.restoreDocument);
  const remove = useMutation(api.documents.deleteDocument);

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

    router.push("/documents");
  };

  return (
    <article className="bg-error-50 dark:bg-error-950 pl-7 pr-5 md:px-[54px] py-4 flex items-center justify-between gap-4 ">
      <p className="text-error-700 dark:text-error-300 font-semibold text-md/md md:text-lg/lg">
        This page is in the trash
      </p>
      <span className="flex items-center gap-3">
        <Button
          onClick={(e) => onRestore(e, documentId)}
          variant="destructive tertiary"
        >
          Restore
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive primary">Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this document?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={(e) => onRemove(e, documentId)}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </span>
    </article>
  );
};
