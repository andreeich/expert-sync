"use client";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
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
import { ScrollArea } from "@/components/ui/scroll-area";
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

const DropdownItem = ({ title, icon, onClick }: DropdownItemProps) => {
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
};

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const { user } = useUser();
  const router = useRouter();
  const addMember = useMutation(api.documents.addMember);
  const removeMember = useMutation(api.documents.removeMember);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputSchema = z.coerce.string().email();
  const [newMember, setNewMember] = useState("");

  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );

  const doc = useQuery(api.documents.getById, {
    documentId: params.documentId,
  });

  const update = useMutation(api.documents.update);
  const archive = useMutation(api.documents.archive);

  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content,
    });
  };

  const onAddNewMember = () => {
    if (newMember === "") return;

    if (inputSchema.safeParse(newMember).success) {
      const promise = addMember({
        id: params.documentId,
        member: newMember,
      });

      toast.promise(promise, {
        loading: "Adding member...",
        success: "Member added",
        error: "Failed to add member.",
      });

      setNewMember("");
    } else {
      toast.error("Invalid email address.");
      const classes = ["shadow-ring-error-xs"];
      inputRef.current?.parentElement?.classList.add(...classes);

      setTimeout(() => {
        inputRef.current?.parentElement?.classList.remove(...classes);
      }, 500);
    }
  };

  const onRemoveMember = (member: string) => {
    const promise = removeMember({
      id: params.documentId,
      member,
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

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        router.push(`/documents/`);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  if (doc === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }

  if (doc === null) {
    return <div>Not found</div>;
  }

  const isOwner = doc?.userId === user?.id;

  return (
    <main className="space-y-8 pt-8 pb-12">
      <header className="flex items-center justify-between px-[3.375rem]">
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
              <div>
                <ScrollArea className="w-full max-h-[13rem]">
                  {doc.members?.length ? (
                    doc.members?.map((member: string) => (
                      <MemberItem
                        key={member}
                        email={member}
                        onRemove={() => onRemoveMember(member)}
                      />
                    ))
                  ) : (
                    <div className="flex items-center px-4 py-2 h-[3.25rem]">
                      <p className="text-sm/sm text-gray-900 font-medium">
                        No members yet
                      </p>
                    </div>
                  )}
                </ScrollArea>
                <hr className="text-gray-200 my-1" />
                <section className="px-4 py-3 flex items-center">
                  <Input
                    ref={inputRef}
                    placeholder="Email address"
                    className="rounded-r-none z-[5]"
                    onChange={(e) => setNewMember(e.target.value)}
                  />
                  <Button
                    variant="secondary"
                    className="h-[44px] rounded-l-none border-l-0 z-[0]"
                    onClick={onAddNewMember}
                  >
                    <Icon variant="plus" />
                  </Button>
                </section>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <Button variant="tertiary gray" size="icon-sm" asChild>
              <DropdownMenuTrigger>
                <Icon variant="dots-vertical" />
              </DropdownMenuTrigger>
            </Button>
            <DropdownMenuContent align="end" className="px-0 py-0.5">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DropdownItem title="Rename" icon="file-edit" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your account and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <DropdownItem title="Publish" icon="share-03" />
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
                  onClick={() =>
                    onRemoveMember(user?.emailAddresses[0].emailAddress!)
                  }
                />
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </menu>
      </header>
      <section>
        <Editor
          onChange={onChange}
          initialContent={doc.content}
          username={user?.fullName || "Anonymous"}
          room={doc._id}
        />
      </section>
    </main>
  );
};

export default DocumentIdPage;
