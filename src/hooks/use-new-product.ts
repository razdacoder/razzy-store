import { create } from "zustand";

interface NewProductState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useNewProduct = create<NewProductState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
