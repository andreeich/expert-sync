import { create } from "zustand";

type HistoryUpdateStore = {
  isUpdating: boolean;
  onUpdate: () => void;
  onIdle: () => void;
  toggle: () => void;
};

export const useHistoryUpdate = create<HistoryUpdateStore>((set, get) => ({
  isUpdating: false,
  onUpdate: () => set({ isUpdating: true }),
  onIdle: () => set({ isUpdating: false }),
  toggle: () => set({ isUpdating: !get().isUpdating }),
}));
