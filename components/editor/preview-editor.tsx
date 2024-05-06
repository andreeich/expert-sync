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
  historyContent?: string;
}

const Editor = ({ initialContent, historyContent }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const isMd = useMediaQuery("(min-width: 768px)");

  const initBlocks = initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined;
  const historyBlocks = historyContent ? (JSON.parse(historyContent) as PartialBlock[]) : undefined;

  let finalBlocks = undefined;
  if (!initBlocks && historyBlocks) finalBlocks = historyBlocks;
  else if (initBlocks && !historyBlocks) finalBlocks = initBlocks;
  else
    finalBlocks =
      !initBlocks || !historyBlocks ? undefined : compareBlocks(initBlocks, historyBlocks);

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: finalBlocks,
  });
  // console.log("finalBlocks :>> ", finalBlocks);

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        sideMenu={isMd ? true : false}
        editable={false}
      />
    </div>
  );
};

const compareBlocks = (init: PartialBlock[], history: PartialBlock[]) => {
  // finding new blocks
  // history?.forEach((historyBlock) => {
  //   const index = init?.find((initBlock) => initBlock.id === historyBlock.id);
  //   if (!index) historyBlock.props?.backgroundColor === "green";
  // });
  // // finding removed blocks
  // // init?.forEach((initBlock) => {
  // //   const index = history?.find((historyBlock) => initBlock.id === historyBlock.id);
  // //   if (!index) historyBlock.props?.backgroundColor === "green";
  // // });

  // creating new version by concatenating init and history ones
  const result = [];
  for (let i = 0; i < init.length; i++) {
    if (i >= history.length) {
      styleBlock(init[i], "red");

      result.push(init[i]);
      continue;
    }
    if (compare(init[i], history[i])) {
      result.push(init[i]);
    } else {
      styleBlock(history[i], "green");
      styleBlock(init[i], "red");

      if (checkBlock(history[i])) result.push(history[i]);
      if (checkBlock(init[i])) result.push(init[i]);
      // result.push(history[i], init[i]);
    }
  }
  for (let i = init.length; i < history.length; i++) {
    styleBlock(history[i], "green");
    result.push(history[i]);
  }

  return result;
};

const styleBlock = (block: PartialBlock, color: string) => {
  block.props!.backgroundColor = color;
  // @ts-ignore valid prop
  block.props!.textColor = color;
  return block;
};

const checkBlock = (block: PartialBlock) => {
  const str = JSON.stringify(block.content);
  if (str === "[]" || str.search(/"text":"\s*"/gm) !== -1) return false;
  return true;
};

const compare = (prev: PartialBlock, next: PartialBlock) => {
  if (prev.id === next.id && JSON.stringify(prev.content) === JSON.stringify(next.content)) {
    return true;
  } else {
    // console.log("block :>> ", {
    //   prevId: prev.id,
    //   nextId: next.id,
    //   prevContent: prev.content,
    //   nextContent: next.content,
    // });
    return false;
  }
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
