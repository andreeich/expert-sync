"use client";

import { useTheme } from "next-themes";
import { Block, BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import "./editor.css";

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { SocketIOProvider } from "y-socket.io";
import { WebrtcProvider } from "y-webrtc";

import { useEdgeStore } from "@/lib/edgestore";
import { useDebounceCallback, useMediaQuery } from "usehooks-ts";
import { Skeleton } from "@/components/ui/skeleton";
import { useContent } from "@/hooks/use-content";
import { useEffect, useState } from "react";
import LiveblocksProvider from "@liveblocks/yjs";
import { useRoom } from "@/liveblocks.config";

export interface EditorProps {
  initialContent?: string;
}

const Editor = ({ initialContent }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const isMd = useMediaQuery("(max-width: 768px)");

  const initBlocks = initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined;
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initBlocks,
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        sideMenu={isMd ? false : true}
        editable={false}
      />
    </div>
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

export default Editor;
