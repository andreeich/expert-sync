"use client";

import { useTheme } from "next-themes";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import {
  BlockNoteView,
  useCreateBlockNote,
  FormattingToolbar,
  FormattingToolbarController,
} from "@blocknote/react";
import "@blocknote/react/style.css";
import "./editor.css";

import { useEdgeStore } from "@/lib/edgestore";
import { useDebounceCallback, useMediaQuery } from "usehooks-ts";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";

export interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  username?: string;
  room?: string;
  role?: string;
}

const Editor = ({
  onChange,
  initialContent,
  editable,
  username,
  room,
  role,
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();
  const isMd = useMediaQuery("(max-width: 768px)");

  const onChangeDebounce = useDebounceCallback(
    (data: string) => onChange(data),
    500
  );

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  // TODO: Setup goddamn collaboration
  const editor: BlockNoteEditor = useCreateBlockNote({
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    uploadFile: handleUpload,
  });

  return (
    <div>
      {editor && (
        <BlockNoteView
          editor={editor}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          editable={editable}
          onChange={() => {
            const block = editor.getTextCursorPosition().block;
            try {
              editor.addStyles({ backgroundColor: "red" });
            } catch (e) {
              console.error("Error Editor: Failed to set styles on edit!");
            }
            onChangeDebounce(JSON.stringify(editor.document, null, 2));
          }}
          sideMenu={isMd ? false : true}
        />
      )}
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
