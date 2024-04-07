"use client";

import React from "react";

import { useMutation, useQuery } from "convex/react";
import { useRef, useState } from "react";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
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

import { DropdownItem } from "./dropdown-item";
import { MemberItem } from "./member-item";
import { useContent } from "@/hooks/use-content";
import { HistoryDialog } from "./history-dialog";

export interface DocumentHeaderProps {
  document: Doc<"documents">;
  role?: string;
  // onApply?: (content: string) => void;
}

export const DocumentHeader = ({
  document,
  role,
}: // onApply,
DocumentHeaderProps) => {
  // TODO: Clean it up
  const { user } = useUser();
  const router = useRouter();
  const documentId = document._id;

  const [memberEmail, setMemberEmail] = useState("");
  const memberEmailRef = useRef<HTMLInputElement>(null);
  const memberEmailSchema = z.coerce.string().email();

  const removeMember = useMutation(api.sharedDocuments.removeSharedDocument);
  const addMember = useMutation(api.sharedDocuments.addSharedDocumentByEmail);
  const updateTitle = useMutation(api.documents.updateDocumentTitle);
  const addTemplate = useMutation(api.templates.addTemplate);
  const archive = useMutation(api.documents.archiveDocument);
  const allMembers = useQuery(api.documents.getMembersByDocument, {
    documentId,
  });
  const addDocumentHistory = useMutation(api.documentHistory.addDocumentHistory);

  const userTemplatesNames = useQuery(api.templates.getUserTemplates)?.map((template) => {
    return template.name;
  });

  const docTitleRef = useRef<HTMLInputElement>(null);
  const docTitleSchema = z.coerce
    .string()
    .min(1)
    .regex(/^[^"\/:*?"<>|]*[^"\/:*?"<>|\.\s]$/);

  const templateNameRef = useRef<HTMLInputElement>(null);
  const templateNameSchema = z.coerce
    .string()
    .min(1)
    .regex(/^[^"\/:*?"<>|]*[^"\/:*?"<>|\.\s]$/);

  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);

  const isOwner = role === "owner";
  const isPreview = role === "preview";

  const content = useContent();

  const onAddNewMember = () => {
    if (memberEmail === "") return;

    if (memberEmailSchema.safeParse(memberEmail).success) {
      const promise = addMember({
        documentId,
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

  // TODO: redirect if the user is a member
  const onRemoveMember = (userTokenId: string) => {
    const promise = removeMember({
      documentId,
      userTokenId,
    });

    toast.promise(promise, {
      loading: "Removing member...",
      success: "Member removed",
      error: "Failed to remove member.",
    });
  };

  const onArchive = () => {
    const promise = archive({ id: documentId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Document moved to trash!",
      error: "Failed to archive document.",
    });

    // router.push("/documents");
  };

  const onRename = () => {
    const docTitle = docTitleRef.current?.value || "";
    if (docTitle === "") return;

    if (docTitleSchema.safeParse(docTitle.trim()).success) {
      const promise = updateTitle({
        id: documentId,
        title: docTitle.trim(),
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
    }
  };

  const onAddTemplate = () => {
    const templateName = templateNameRef.current?.value || "";

    if (templateName === "") return;

    if (
      templateNameSchema.safeParse(templateName.trim()).success &&
      !userTemplatesNames?.includes(templateName.trim())
    ) {
      const promise = addTemplate({
        name: templateName.trim(),
        content: document.content || "[]",
        icon: "file-05",
      });

      toast.promise(promise, {
        loading: "Adding template...",
        success: "Template added",
        error: "Failed to add template.",
      });

      setIsTemplateDialogOpen(false);
    } else {
      toast.error("Wrong template name format!");
      const classes = ["!shadow-ring-error-xs"];
      templateNameRef.current?.parentElement?.classList.add(...classes);

      setTimeout(() => {
        templateNameRef.current?.parentElement?.classList.remove(...classes);
      }, 500);
    }
  };

  const onAddDocumentHistory = () => {
    if (!document.content) return;
    const promise = addDocumentHistory({
      documentId,
      content: document.content,
    });

    toast.promise(promise, {
      loading: "Saving document...",
      success: "Document saved",
      error: "Failed to save document.",
    });
  };

  return (
    <header className="flex items-center gap-2 justify-between px-4 md:px-[3.375rem]">
      <Tooltip>
        <TooltipTrigger>
          <h1 className="text-display-xs/display-xs md:text-display-sm/display-sm font-semibold text-gray-900 dark:text-gray-50 line-clamp-1 break-all">
            {document.title}
          </h1>
        </TooltipTrigger>
        <TooltipContent>
          <p>{document.title}</p>
        </TooltipContent>
      </Tooltip>

      {!isPreview && (
        <menu className="flex items-center gap-3">
          {/* {onApply && content.content.length > 0 && (
          <Button
            size="icon-sm"
            onClick={() => onApply(JSON.stringify(content.content, null, 2))}
          >
            <Icon variant="check-circle" />
          </Button>
        )} */}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger>
                <Button className="group" variant="secondary" size="sm" asChild>
                  <DropdownMenuTrigger>
                    <span className="hidden md:inline">Members</span>
                    <Icon variant="users-01" className="md:hidden" />
                    <Icon
                      className="group-data-[state=open]:rotate-180 transition-transform"
                      variant="chevron-down"
                    />
                  </DropdownMenuTrigger>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="md:hidden">
                <p>Members</p>
              </TooltipContent>
            </Tooltip>

            <DropdownMenuContent
              align="end"
              className="w-[375px] max-w-[calc(100vw_-_2rem_-_3.25rem)] p-0"
              sideOffset={8}
            >
              <ScrollArea className="w-full h-[13rem]">
                {allMembers?.length ? (
                  allMembers?.map((member) => (
                    <MemberItem
                      key={member!.tokenIdentifier}
                      name={member?.name || "Anonymous"}
                      avatarUrl={member?.picture}
                      email={member?.email || "No email"}
                      onRemove={() => onRemoveMember(member!.tokenIdentifier)}
                    />
                  ))
                ) : (
                  <div className="flex items-center px-4 py-2 h-[3.25rem]">
                    <p className="text-sm/sm text-gray-900 dark:text-gray-50 font-medium">
                      No members yet
                    </p>
                  </div>
                )}
                <ScrollBar orientation="vertical" />
              </ScrollArea>
              <hr className="border-gray-200 dark:border-gray-800" />
              <form className="px-4 py-3 flex items-center">
                <Input
                  ref={memberEmailRef}
                  type="email"
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
              </form>
            </DropdownMenuContent>
          </DropdownMenu>
          {isOwner && (
            <HistoryDialog documentId={documentId}>
              <Button className="group" variant="secondary" size="icon-sm" aria-label="History">
                <Icon variant="box" />
              </Button>
            </HistoryDialog>
          )}
          <DropdownMenu>
            <Tooltip>
              <TooltipTrigger>
                <Button variant="tertiary gray" size="icon-sm" asChild>
                  <DropdownMenuTrigger>
                    <Icon variant="dots-vertical" />
                  </DropdownMenuTrigger>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Options</p>
              </TooltipContent>
            </Tooltip>
            <DropdownMenuContent
              align="end"
              className="px-0 py-0.5 max-w-[calc(100vw_-_32px)] w-fit flex flex-col"
              sideOffset={8}
            >
              {isOwner && (
                <AlertDialog
                  onOpenChange={() => {
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
                        defaultValue={document.title}
                        ref={docTitleRef}
                      />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button onClick={onRename}>Apply</Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              {isOwner && (
                <AlertDialog
                  onOpenChange={() => {
                    setIsTemplateDialogOpen((prev) => !prev);
                  }}
                  open={isTemplateDialogOpen}
                >
                  <AlertDialogTrigger asChild>
                    <DropdownItem title="Create a template" icon="file-05" />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <Input
                        className="w-full"
                        label="Please enter a template name"
                        placeholder="Template name"
                        hint='Note that special characters (such as ", /, :, *, ?, ", &lt;, &gt;, |) are not allowed. The file name should not end with a space or a period.'
                        ref={templateNameRef}
                      />
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <Button onClick={onAddTemplate}>Apply</Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              <DropdownItem title="Save" icon="save-01" onClick={onAddDocumentHistory} />

              <hr className="border-gray-200 dark:border-gray-800 my-1 first:hidden" />
              {isOwner ? (
                <DropdownItem title="Delete" icon="trash-01" onClick={onArchive} />
              ) : (
                <DropdownItem
                  title="Disconnect"
                  icon="log-out-01"
                  onClick={() => {
                    onRemoveMember(user!.id);
                    router.push("/documents");
                  }}
                />
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </menu>
      )}
    </header>
  );
};

DocumentHeader.Skeleton = function DocumentHeaderSkeleton() {
  return (
    <header className="flex items-center gap-2 justify-between px-4 md:px-[3.375rem]">
      <Skeleton className="w-[7.5rem] h-[2rem] md:h-[2.375rem]" />
      <Skeleton className="w-[10.625rem] h-[2.625rem]" />
    </header>
  );
};
