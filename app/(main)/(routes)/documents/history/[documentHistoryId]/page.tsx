"use client";

import React from "react";

import { useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useEffect, useMemo } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from "next/navigation";

import { EditorSkeleton } from "@/components/editor/editor";
import { RestoreBanner } from "@/app/(main)/_components/restore-banner";
import { HistoryHeader } from "@/app/(main)/_components/history-header";

interface DocumentHistoryIdPageProps {
  params: {
    documentHistoryId: Id<"documentHistory">;
  };
}

const DocumentHistoryIdPage = ({ params }: DocumentHistoryIdPageProps) => {
  const router = useRouter();
  const history = useQuery(api.documentHistory.getHistoryById, {
    documentHistoryId: params.documentHistoryId,
  });
  const doc = useQuery(api.documentHistory.getDocumentByHistoryId, {
    documentHistoryId: params.documentHistoryId,
  });

  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor/preview-editor"), { ssr: false }),
    [],
  );

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
      {history && (
        <RestoreBanner
          documentId={history.documentId}
          createdBy={history.createdBy}
          timestamp={history.timestamp}
          content={history.content}
        />
      )}
      <section className="space-y-6 md:space-y-8 pt-8 pb-12 relative flex-1">
        {history ? (
          <>
            <HistoryHeader documentId={history.documentId} />
            <Editor initialContent={doc?.content} historyContent={history.content} />
          </>
        ) : (
          <>
            <HistoryHeader.Skeleton />
            <EditorSkeleton />
          </>
        )}
      </section>
    </main>
  );
};

export default DocumentHistoryIdPage;
