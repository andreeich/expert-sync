"use client";

import { useTheme } from "next-themes";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";

import { useEdgeStore } from "@/lib/edgestore";
import * as Y from "yjs";
import YPartyKitProvider from "y-partykit/provider";
import useYProvider from "y-partykit/react";
import { useDebounceCallback } from "usehooks-ts";
import { useEffect, useMemo, useState } from "react";
import { set } from "zod";
interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  username?: string;
  room?: string;
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

  // blocks setup
  // real-time collaboration setup:
  let collaboration:
    | {
        provider: any;
        fragment: any;
        user: { name: string; color: string };
      }
    | undefined = undefined;
  if (!!room) {
    const doc = new Y.Doc();
    const provider = new YPartyKitProvider(
      "blocknote-dev.yousefed.partykit.dev",
      // "http://192.168.0.147:1999",
      room,
      // @ts-ignore there is no problem
      doc
    );
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
    collaboration = {
      // The Yjs Provider responsible for transporting updates:
      provider,
      // Where to store BlockNote data in the Y.Doc:
      // @ts-ignore there is no problem
      fragment: doc.getXmlFragment("document-store"),
      // Information (name and color) for this user:
      user: {
        name: username!,
        color: colors[Math.floor(Math.random() * colors.length)],
      },
    };
  }

  const initialBlocks = initialContent
    ? // @ts-ignore don't know required types
      (JSON.parse(initialContent) as PartialBlock[])
    : undefined;
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialBlocks,
    onEditorContentChange: (editor) => {
      onChangeDebounce(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
    collaboration,
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
