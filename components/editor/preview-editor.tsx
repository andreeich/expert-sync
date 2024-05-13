"use client";

import { useTheme } from "next-themes";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import "./editor.css";

import { useMediaQuery } from "usehooks-ts";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

export interface EditorProps {
  initialContent?: string;
  historyContent?: string;
}

const Editor = ({ initialContent, historyContent }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const isMd = useMediaQuery("(min-width: 768px)");

  const initBlocks = initialContent ? (JSON.parse(initialContent) as PartialBlock[]) : undefined;
  const historyBlocks = historyContent ? (JSON.parse(historyContent) as PartialBlock[]) : undefined;

  if (!initBlocks || !historyBlocks) throw new Error("No enough data for comparison");
  const finalBlocks =
    !initBlocks || !historyBlocks ? undefined : compareBlocks(initBlocks, historyBlocks);

  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: finalBlocks,
  });

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
  if (typeof str !== "string") return true;
  if (str === "[]" || str?.search(/"text":"\s*"/gm) !== -1) return false;
  return true;
};

const compare = (prev: PartialBlock, next: PartialBlock) => {
  if (prev.id === next.id && JSON.stringify(prev.content) === JSON.stringify(next.content)) {
    return true;
  } else {
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
