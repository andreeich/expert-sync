"use client";

// TODO: collaboration work

import { useTheme } from "next-themes";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

import { useEdgeStore } from "@/lib/edgestore";
import * as Y from "yjs";
import YPartyKitProvider from "y-partykit/provider";
interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

const Editor = ({ onChange, initialContent, editable }: EditorProps) => {
  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });

    return response.url;
  };

  // const doc = new Y.Doc();

  // const provider = new YPartyKitProvider(
  //   "blocknote-dev.yousefed.partykit.dev",
  //   // use a unique name as a "room" for your application:
  //   "block-party-revolution",
  //   doc
  // ); // setup a yjs provider (explained below)
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent
      ? (JSON.parse(initialContent) as PartialBlock[])
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload,
    // collaboration: {
    //   // The Yjs Provider responsible for transporting updates:
    //   provider,
    //   // Where to store BlockNote data in the Y.Doc:
    //   fragment: doc.getXmlFragment("document-store"),
    //   // Information (name and color) for this user:
    //   user: {
    //     name: "My Username",
    //     color: "#ff0000",
    //   },
    // },
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
