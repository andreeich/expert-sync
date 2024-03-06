import { create } from "zustand";

type TemplateDialogStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
};

export const useTemplateDialog = create<TemplateDialogStore>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  onToggle: () => set({ isOpen: !get().isOpen }),
}));
