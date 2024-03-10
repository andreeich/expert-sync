"use client";

import React from "react";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";

import { Spinner } from "@/components/spinner";
import { DocumentHeader } from "../../../_components/document-header";
import { EditorSkeleton } from "@/components/editor/editor";
import { Chat } from "../../../_components/chat";

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

  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor/editor"), { ssr: false }),
    []
  );

  const onChangeContent = (content: string) => {
    updateContent({
      id: params.documentId,
      content,
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
    <main className="space-y-6 md:space-y-8 pt-24 md:pt-8 pb-12 relative h-full">
      {doc ? (
        <>
          <DocumentHeader document={doc} />
          <Editor
            onChange={onChangeContent}
            initialContent={doc.content}
            username={user?.fullName || "Anonymous"}
            room={doc._id}
          />
          <div className="absolute right-4 md:right-8 bottom-4 md:bottom-8">
            <Chat documentId={doc._id} />
          </div>
        </>
      ) : (
        <>
          <DocumentHeader.Skeleton />
          <EditorSkeleton />
        </>
      )}
    </main>
  );
};

export default DocumentIdPage;
