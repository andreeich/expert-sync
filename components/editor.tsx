"use client";

import { useTheme } from "next-themes";
import {
  BlockIdentifier,
  BlockNoteEditor,
  PartialBlock,
} from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

import { useEdgeStore } from "@/lib/edgestore";
import * as Y from "yjs";
import YPartyKitProvider from "y-partykit/provider";
import useYProvider from "y-partykit/react";
import { useDebounceCallback } from "usehooks-ts";
import { useEffect, useMemo } from "react";
interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  username: string;
  room: string;
}

const Editor = ({
  onChange,
  initialContent,
  editable,
  username,
  room,
}: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

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

  const doc = useMemo(() => new Y.Doc(), []);

  const provider = useYProvider({
    host: "blocknote-dev.yousefed.partykit.dev",
    room,
    doc,
  });
  // an array of 15 colors to choose from:
  const colors = [
    "#FF5733", // Red
    "#FFBD33", // Orange
    "#DBFF33", // Yellow
    "#75FF33", // Lime
    "#33FF57", // Green
    "#33FFBD", // Teal
    "#33DBFF", // Cyan
    "#3375FF", // Blue
    "#5733FF", // Indigo
    "#BD33FF", // Violet
    "#FF33DB", // Pink
    "#FF3375", // Rose
    "#FF9999", // Light Red
    "#99FF99", // Light Green
    "#9999FF", // Light Blue
  ];
  const initialBlocks = initialContent
    ? (JSON.parse(initialContent) as PartialBlock[])
    : undefined;
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialBlocks,
    onEditorContentChange: (editor) => {
      onChangeDebounce(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
    collaboration: {
      // The Yjs Provider responsible for transporting updates:
      provider,
      // Where to store BlockNote data in the Y.Doc:
      fragment: doc.getXmlFragment("document-store"),
      // Information (name and color) for this user:
      user: {
        name: username,
        color: colors[Math.floor(Math.random() * colors.length)],
      },
    },
  });

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Editor;
