"use client";

import React from "react";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { use, useEffect, useMemo, useRef, useState } from "react";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Spinner } from "@/components/spinner";

interface MemberItemProps {
  email: string;
  onRemove: () => void;
}

const MemberItem = ({ email, onRemove }: MemberItemProps) => {
  return (
    <div className="flex gap-3 px-4 py-2 items-center justify-between border-b border-gray-200 last:border-b-0">
      <p className="text-sm/sm text-gray-900 font-medium">{email}</p>
      <Button onClick={onRemove} variant="tertiary gray" size="icon-sm">
        <Icon variant="delete" />
      </Button>
    </div>
  );
};

interface DropdownItemProps {
  title: string;
  icon: string;
  onClick?: () => void;
}

const DropdownItem = React.forwardRef<HTMLButtonElement, DropdownItemProps>(
  ({ title, icon, onClick }: DropdownItemProps) => {
    return (
      <button className="px-1.5 py-0.5 group w-full" onClick={onClick}>
        <div className="flex items-center h-full gap-3 rounded-md w-full px-2.5 py-2 group-hover:bg-gray-50 transition-colors">
          <Icon variant={icon} className="gray-500 w-4 h-4" />
          <span className="text-sm/sm font-medium text-gray-700 group-disabled:text-gray-500">
            {title}
          </span>
        </div>
      </button>
    );
  }
);

DropdownItem.displayName = "DropdownItem";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const { user } = useUser();
  const router = useRouter();

  const [memberEmail, setMemberEmail] = useState("");
  const memberEmailRef = useRef<HTMLInputElement>(null);
  const memberEmailSchema = z.coerce.string().email();

  const removeMember = useMutation(api.sharedDocuments.removeSharedDocument);
  const addMember = useMutation(api.sharedDocuments.addSharedDocumentByEmail);
  const updateTitle = useMutation(api.documents.updateDocumentTitle);
  const updateContent = useMutation(api.documents.updateDocumentContent);
  const archive = useMutation(api.documents.archiveDocument);
  const currentUser = useQuery(api.users.getUserByEmail, {
    email: user?.emailAddresses[0].emailAddress || "",
  });
  const allMembers = useQuery(api.documents.getMembersByDocument, {
    documentId: params.documentId,
  });
  const doc = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId,
  });

  const [docTitle, setDocTitle] = useState(doc?.title || "Untitled");
  const docTitleRef = useRef<HTMLInputElement>(null);
  const docTitleSchema = z.coerce
    .string()
    .min(1)
    .regex(/^[^"\/:*?"<>|]*[^"\/:*?"<>|\.\s]$/);

  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);

  const isOwner = doc?.userId === currentUser?._id;

  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor/editor"), { ssr: false }),
    []
  );

  const onChangeTitle = (title: string) => {
    updateTitle({
      id: params.documentId,
      title,
    });
  };

  const onChangeContent = (content: string) => {
    updateContent({
      id: params.documentId,
      content,
    });
  };

  const onAddNewMember = () => {
    if (memberEmail === "") return;

    if (memberEmailSchema.safeParse(memberEmail).success) {
      const promise = addMember({
        documentId: params.documentId,
        email: memberEmail,
      });

      toast.promise(promise, {
        loading: "Adding member...",
        success: "Member added",
        error: "Failed to add member.",
      });

      setMemberEmail("");
    } else {
      toast.error("Invalid email address.");
      const classes = ["!shadow-ring-error-xs"];
      memberEmailRef.current?.parentElement?.classList.add(...classes);

      setTimeout(() => {
        memberEmailRef.current?.parentElement?.classList.remove(...classes);
      }, 500);
    }
  };

  const onRemoveMember = (userId: Doc<"users">["_id"]) => {
    const promise = removeMember({
      documentId: params.documentId,
      userId,
    });

    toast.promise(promise, {
      loading: "Removing member...",
      success: "Member removed",
      error: "Failed to remove member.",
    });
  };

  const onArchive = () => {
    const promise = archive({ id: params.documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Document moved to trash!",
      error: "Failed to archive document.",
    });

    router.push("/documents");
  };

  const onRename = () => {
    if (docTitle === "") return;

    if (docTitleSchema.safeParse(docTitle.trim()).success) {
      const promise = updateTitle({
        id: params.documentId,
        title: docTitle.trim(),
      }).then(() => {
        setDocTitle(doc?.title || docTitle);
      });

      toast.promise(promise, {
        loading: "Renaming document...",
        success: "Document renamed",
        error: "Failed to rename document.",
      });

      setIsRenameDialogOpen(false);
    } else {
      toast.error("Wrong document name format!");
      const classes = ["!shadow-ring-error-xs"];
      docTitleRef.current?.parentElement?.classList.add(...classes);

      setTimeout(() => {
        docTitleRef.current?.parentElement?.classList.remove(...classes);
      }, 500);

      setDocTitle(doc?.title || docTitle);
    }
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        router.push(`/documents/`);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [router]);

  if (doc === undefined) {
    return (
      <div className="h-full flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (doc === null) {
    return <div>Not found</div>;
  }

  return (
    <main className="space-y-6 md:space-y-8 pt-24 md:pt-8 pb-12">
      <header className="flex items-center gap-2 justify-between pl-[3.375rem] pr-4 md:px-[3.375rem]">
        <h1 className="text-display-sm/display-sm font-semibold text-gray-900">
          {doc.title}
        </h1>
        <menu className="flex items-center gap-3">
          <DropdownMenu>
            <Button className="group" variant="secondary" size="sm" asChild>
              <DropdownMenuTrigger>
                Members
                <Icon
                  className="group-data-[state=open]:rotate-180 transition-transform"
                  variant="chevron-down"
                />
              </DropdownMenuTrigger>
            </Button>
            <DropdownMenuContent align="end" className="w-[375px] p-0">
              <ScrollArea className="w-full h-[13rem]">
                {allMembers?.length ? (
                  allMembers?.map((member) => (
                    <MemberItem
                      key={member!._id}
                      email={member?.email || "No email"}
                      onRemove={() => onRemoveMember(member!._id)}
                    />
                  ))
                ) : (
                  <div className="flex items-center px-4 py-2 h-[3.25rem]">
                    <p className="text-sm/sm text-gray-900 font-medium">
                      No members yet
                    </p>
                  </div>
                )}
                <ScrollBar orientation="vertical" />
              </ScrollArea>
              <hr className="text-gray-200 my-1" />
              <section className="px-4 py-3 flex items-center">
                <Input
                  ref={memberEmailRef}
                  placeholder="Email address"
                  value={memberEmail}
                  className="rounded-r-none z-[5] w-full"
                  onChange={(e) => setMemberEmail(e.target.value)}
                />
                <Button
                  variant="secondary"
                  className="h-[44px] rounded-l-none border-l-0 z-[0]"
                  onClick={onAddNewMember}
                >
                  <Icon variant="plus" />
                </Button>
              </section>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <Button variant="tertiary gray" size="icon-sm" asChild>
              <DropdownMenuTrigger>
                <Icon variant="dots-vertical" />
              </DropdownMenuTrigger>
            </Button>
            <DropdownMenuContent align="end" className="px-0 py-0.5">
              <AlertDialog
                onOpenChange={() => {
                  setDocTitle(doc?.title || docTitle);
                  setIsRenameDialogOpen((prev) => !prev);
                }}
                open={isRenameDialogOpen}
              >
                <AlertDialogTrigger asChild>
                  <DropdownItem title="Rename" icon="file-edit" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <Input
                      className="w-full"
                      label="Please enter a file name"
                      hint='Note that special characters (such as ", /, :, *, ?, ", &lt;, &gt;, |) are not allowed. The file name should not end with a space or a period.'
                      value={docTitle}
                      onChange={(e) => setDocTitle(e.target.value)}
                      ref={docTitleRef}
                    />
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button onClick={onRename}>Apply</Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <hr className="text-gray-200 my-1" />
              {isOwner ? (
                <DropdownItem
                  title="Delete"
                  icon="trash-01"
                  onClick={onArchive}
                />
              ) : (
                <DropdownItem
                  title="Disconnect"
                  icon="log-out-01"
                  onClick={() => onRemoveMember(currentUser?._id!)}
                />
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </menu>
      </header>
      <section>
        <Editor
          onChange={onChangeContent}
          initialContent={doc.content}
          username={user?.fullName || "Anonymous"}
          room={doc._id}
        />
      </section>
    </main>
  );
};

export default DocumentIdPage;
