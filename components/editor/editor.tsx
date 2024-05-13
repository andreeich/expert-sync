"use client";

import { useTheme } from "next-themes";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import "./editor.css";

import * as Y from "yjs";

import { useEdgeStore } from "@/lib/edgestore";
import { useDebounceCallback, useMediaQuery } from "usehooks-ts";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useMemo, useState } from "react";
import LiveblocksProvider from "@liveblocks/yjs";
import { useRoom } from "@/liveblocks.config";
import { useHistoryUpdate } from "@/hooks/use-history-update";
import { useEditor } from "@/hooks/use-editor";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  username: string;
  room: string;
  role?: string;
}

const Editor = ({ onChange, initialContent, editable, username, role }: EditorProps) => {
  const room = useRoom();
  const [doc, setDoc] = useState<Y.Doc>();
  const [provider, setProvider] = useState<any>();

  useEffect(() => {
    const yDoc = new Y.Doc();
    const yProvider = new LiveblocksProvider(room, yDoc);
    setDoc(yDoc);
    setProvider(yProvider);

    return () => {
      yDoc?.destroy();
      yProvider?.destroy();
    };
  }, [room]);

  if (!doc || !provider) {
    return null;
  }

  return (
    <BlockNote
      doc={doc}
      provider={provider}
      username={username}
      onChange={onChange}
      initialContent={initialContent}
    />
  );
};

export const EditorSkeleton = () => {
  return (
    <div className="px-4 md:px-[54px]">
      <Skeleton className="h-[4.5rem] my-[0.1875rem] w-1/3" />
      <Skeleton className="h-6 my-[0.1875rem] w-1/2" />
      <Skeleton className="h-6 my-[0.1875rem] w-3/4" />
      <Skeleton className="h-6 my-[0.1875rem] w-2/3" />
    </div>
  );
};

type BlockNoteProps = {
  doc: Y.Doc;
  provider: any;

  onChange: (value: string) => void;
  initialContent?: string;
  username: string;
};

function BlockNote({ doc, provider, initialContent, username, onChange }: BlockNoteProps) {
  const isMd = useMediaQuery("(min-width: 768px)");
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
  const onChangeDebounced = useDebounceCallback(onChange, 5000);
  const historyUpdate = useHistoryUpdate();
  const Editor = useEditor();
  const params = useParams();

  const handleUpload = async (file: File) => {
    const promise = edgestore.publicFiles.upload({
      file,
    });

    toast.promise(promise, {
      loading: "Uploading the picture...",
      success: "Picture uploaded.",
      error: "Failed to upload the picture.",
    });

    const response = await promise;

    return response.url;
  };

  const userColors = [
    "#ACDC79",
    "#A6EF67",
    "#73E2A3",
    "#5FE9D0",
    "#67E3F9",
    "#7CD4FD",
    "#84CAFF",
    "#84ADFF",
    "#A4BCFD",
    "#C3B5FD",
    "#BDB4FE",
    "#EEAAFD",
    "#FAA7E0",
    "#FEA3B4",
    "#FF9C66",
    "#F7B27A",
    "#FDE272",
  ];

  const editor: BlockNoteEditor = useCreateBlockNote({
    uploadFile: handleUpload,
    collaboration: {
      provider: provider,
      fragment: doc.getXmlFragment("document-store"),
      user: {
        name: username,
        color: userColors[Math.floor(Math.random() * userColors.length)],
      },
    },
  });

  const docId = useMemo(() => {
    return Editor.documentId;
  }, [Editor]);

  useEffect(() => {
    if (Editor.editor === undefined) Editor.set(editor, params.documentId as string);
    onChangeDebounced(JSON.stringify(editor.document));

    return () => {
      Editor.destroy();
      onChange(JSON.stringify(editor.document));
    };
  }, []);

  const initBlocks = useMemo(
    () => (initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined),
    [initialContent],
  );

  if (initBlocks) {
    Editor.init(initBlocks);
  }

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        sideMenu={isMd ? true : false}
      />
    </div>
  );
}

export default Editor;
