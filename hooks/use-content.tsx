import { create } from "zustand";
import { Block, BlockNoteEditor } from "@blocknote/core";

// TODO: Make use of it

type ContentStore = {
  ids: string[];
  content: Block[];
  setContent: (content: Block[]) => void;
  clear: () => void;
  send: (editor: BlockNoteEditor) => void;
};

export const useContent = create<ContentStore>((set, get) => ({
  ids: [],
  content: [],
  clear: () => set({ ids: [] }),
  addId: (id: string) => {
    if (!get().ids.includes(id)) {
      set((state) => ({
        ...state,
        ids: [...state.ids, id],
      }));
    }
  },
  setContent: (content: Block[]) => {
    set((state) => ({
      ...state,
      content,
    }));
  },
  send: (editor: BlockNoteEditor) => {
    const changedBlocks = editor.document.filter((block) =>
      get().ids.includes(block.id)
    );
    set((state) => ({
      ...state,
      content: changedBlocks,
    }));
  },
}));
