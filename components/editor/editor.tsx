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
    // initialContent: initBlocks,
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
  // const store = doc.getXmlFragment("document-store");
  // console.log(doc.getXmlFragment("document-store").toJSON());
  // const { isUpdating } = historyUpdate;
  // const update = isUpdating === true;
  // useEffect(() => console.log(update), [update]);
  // const editor = useMemo(
  //   () =>
  //     BlockNoteEditor.create({
  //       initialContent: initBlocks,
  //       uploadFile: handleUpload,
  //       collaboration: {
  //         provider: provider,
  //         fragment: doc.getXmlFragment("document-store"),
  //         user: {
  //           name: username,
  //           color: userColors[Math.floor(Math.random() * userColors.length)],
  //         },
  //       },
  //     }),
  //   [update],
  // );

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
    // console.log(initBlocks);
  }

  return (
    <div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
        onChange={() => {
          // if (JSON.stringify(editor.document) !== initialContent)
          //   onChangeDebounced(JSON.stringify(editor.document));
          // const store = doc.getXmlFragment("document-store");
          // const el = new Y.XmlElement(
          //   '<blockgroup><blockcontainer backgroundColor="default" id="c92e7227-b12e-4f41-a86e-59497475f8f3" textColor="default"><paragraph textAlignment="left">dsssdffdfdsdf</paragraph></blockcontainer><blockcontainer backgroundColor="default" id="4af9bd66-a891-4ce1-b6c3-857506034a1e" textColor="default"><paragraph textAlignment="left"></paragraph></blockcontainer></blockgroup>',
          // );
          // store.delete();
          // store.insert(0, [el]);
          // console.log(store.toJSON());
          // store.insert(0, [new Y.XmlText("text")]);
        }}
        onFocus={() => {
          // const store = doc.getXmlFragment("document-store");
          // const el = new Y.XmlText(
          //   '<blockgroup><blockcontainer backgroundColor="default" id="c92e7227-b12e-4f41-a86e-59497475f8f3" textColor="default"><paragraph textAlignment="left">dsssdffdfdsdf</paragraph></blockcontainer><blockcontainer backgroundColor="default" id="4af9bd66-a891-4ce1-b6c3-857506034a1e" textColor="default"><paragraph textAlignment="left"></paragraph></blockcontainer></blockgroup>',
          // );
          // // const node = new Y.XmlElement("blockgroup");
          // // node.insert(0, [new Y.XmlElement("blockcontainer")]);
          // store?.delete(0);
          // store?.insert(0, [el]);
          // console.log(store?.toJSON());
          // editor.forEachBlock((block) => {
          //   editor.removeBlocks([block.id]);
          //   // editor.insertBlocks([{ type: "paragraph", content: "Hello world" }], block, "after");
          //   // console.log(block.content);
          // });
          // ! remove all blocks
          // editor.document.forEach((block) => {
          //   editor.removeBlocks([block.id]);
          // });
          // Editor.clear();
          // console.log(Editor.documentId);
          // ! insert before all blocks
          // editor.document.forEach((block) => {
          //   editor.insertBlocks([{ type: "paragraph", content: "Hello World" }], block, "before");
          // });
          // const doc = editor.document;
          // console.log(doc);
        }}
        sideMenu={isMd ? true : false}
      />
    </div>
  );
}

export default Editor;
