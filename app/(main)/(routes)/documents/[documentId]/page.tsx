"use client";

import React, { useState } from "react";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import { Spinner } from "@/components/spinner";
import { DocumentHeader } from "../../../_components/document-header";
import { EditorSkeleton } from "@/components/editor/editor";
import { Chat } from "../../../_components/chat";
import { Banner } from "@/app/(main)/_components/banner";
import { toast } from "sonner";

interface DocumentIdPageProps {
  params: {
    documentId: Id<"documents">;
  };
}

const DocumentIdPage = ({ params }: DocumentIdPageProps) => {
  const { user } = useUser();
  const router = useRouter();

  const updateContent = useMutation(api.documents.updateDocumentContent);
  const doc = useQuery(api.documents.getDocumentById, {
    documentId: params.documentId,
  });
  const role = useQuery(api.documents.getDocumentRole, {
    documentId: params.documentId,
  });

  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor/editor"), { ssr: false }),
    []
  );

  const onChangeContent = (content: string) => {
    const promise = updateContent({
      id: params.documentId,
      content,
    });

    toast.promise(promise, {
      loading: "Saving document...",
      success: "Document saved",
      error: "Failed to save document.",
    });
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

  return (
    <main className="h-full  flex flex-col pt-16 md:pt-0">
      {doc && doc.isArchived && <Banner documentId={doc._id} />}
      <section className="space-y-6 md:space-y-8 pt-8 pb-12 relative flex-1">
        {doc ? (
          <>
            <DocumentHeader
              document={doc}
              role={role}
              // onApply={onChangeContent}
            />
            <Editor
              onChange={onChangeContent}
              initialContent={doc.content}
              username={user?.fullName || "Anonymous"}
              room={doc._id}
              role={role}
            />
            <div className="fixed right-4 md:right-8 bottom-4 md:bottom-8">
              <Chat documentId={doc._id} />
            </div>
          </>
        ) : (
          <>
            <DocumentHeader.Skeleton />
            <EditorSkeleton />
            <div className="fixed right-4 md:right-8 bottom-4 md:bottom-8">
              <Chat.Skeleton />
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default DocumentIdPage;
