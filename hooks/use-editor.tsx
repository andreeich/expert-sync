import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { create } from "zustand";

type EditorStore = {
  documentId: string | undefined;
  editor: BlockNoteEditor | undefined;
  waitForEditor: () => Promise<BlockNoteEditor | undefined>;
  set: (editor: BlockNoteEditor, documentId: string) => void;
  destroy: () => void;
  clear: () => void;
  init: (blocks: PartialBlock[]) => void;
};

export const useEditor = create<EditorStore>((set, get) => ({
  documentId: undefined,
  editor: undefined,
  waitForEditor: () => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const timeoutDuration = 10000; // 10 seconds timeout

      const interval = setInterval(() => {
        if (get().editor !== undefined) {
          clearInterval(interval);
          resolve(get().editor);
        } else if (Date.now() - startTime >= timeoutDuration) {
          clearInterval(interval);
          reject(new Error("Variable is still undefined after 10 seconds!"));
        }
      }, 100); // Check every 100 milliseconds
    });
  },
  set: (editor, documentId) => set({ editor, documentId }),
  destroy: () => set({ editor: undefined, documentId: undefined }),
  clear: async () => {
    const editor = await get().waitForEditor();
    try {
      editor?.document?.forEach((block) => {
        editor?.removeBlocks([block?.id]);
      });
    } catch (e) {
      console.error(new Error("Error: Editor cleer() function"));
    }
  },
  init: async (blocks) => {
    get().clear();
    const editor = await get().waitForEditor();
    try {
      editor?.insertBlocks(blocks, editor.document[0], "before");
      console.log("inited");
    } catch (e) {
      console.error(new Error("Error: Editor init() function"));
    }
  },
}));
