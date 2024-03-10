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

export interface DocumentHeaderProps {
  document: Doc<"documents">;
}

export const DocumentHeader = ({ document }: DocumentHeaderProps) => {
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
  const currentUser = useQuery(api.users.getUserByEmail, {
    email: user?.emailAddresses[0].emailAddress || "",
  });
  const allMembers = useQuery(api.documents.getMembersByDocument, {
    documentId,
  });
  const userTemplatesNames = useQuery(api.templates.getUserTemplates)?.map(
    (template) => {
      return template.name;
    }
  );

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

  const isOwner = document.userId === currentUser?._id;

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

  const onRemoveMember = (userId: Doc<"users">["_id"]) => {
    const promise = removeMember({
      documentId,
      userId,
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

    router.push("/documents");
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

  return (
    <header className="flex items-center gap-2 justify-between pl-[3.375rem] pr-4 md:px-[3.375rem]">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <h1 className="text-display-xs/display-xs md:text-display-sm/display-sm font-semibold text-gray-900 line-clamp-1 break-all">
              {document.title}
            </h1>
          </TooltipTrigger>
          <TooltipContent>
            <p>{document.title}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

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
          <DropdownMenuContent
            align="end"
            className="w-[375px] max-w-[calc(100vw_-_32px_-_52px)] p-0"
            sideOffset={8}
          >
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
            <hr className="text-gray-200" />
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
          <DropdownMenuContent
            align="end"
            className="px-0 py-0.5 max-w-[calc(100vw_-_32px)] w-fit flex flex-col"
            sideOffset={8}
          >
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

            <hr className="text-gray-200" />
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
  );
};

DocumentHeader.Skeleton = function DocumentHeaderSkeleton() {
  return (
    <header className="flex items-center gap-2 justify-between pl-[3.375rem] pr-4 md:px-[3.375rem]">
      <Skeleton className="w-[7.5rem] h-[2rem] md:h-[2.375rem]" />
      <Skeleton className="w-[10.625rem] h-[2.625rem]" />
    </header>
  );
};
