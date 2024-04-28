import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { create } from "zustand";

type EditorStore = {
  documentId: string | undefined;
  editor: BlockNoteEditor | undefined;
  set: (editor: BlockNoteEditor, documentId: string) => void;
  destroy: () => void;
  clear: () => void;
  init: (blocks: PartialBlock[]) => void;
};

export const useEditor = create<EditorStore>((set, get) => ({
  documentId: undefined,
  editor: undefined,
  set: (editor, documentId) => set({ editor, documentId }),
  destroy: () => set({ editor: undefined, documentId: undefined }),
  clear: () => {
    const editor = get().editor;
    try {
      editor?.document?.forEach((block) => {
        editor?.removeBlocks([block?.id]);
      });
    } catch (e) {
      console.error(new Error("Error: Editor cleer() function"));
    }
  },
  init: (blocks) => {
    get().clear();
    const editor = get().editor;
    try {
      editor?.insertBlocks(blocks, editor.document[0], "before");
    } catch (e) {
      console.error(new Error("Error: Editor init() function"));
    }
  },
}));
