import { create } from "zustand";

interface EditProducState {
  slug?: string;
  isOpen: boolean;
  onOpen: (slug: string) => void;
  onClose: () => void;
}

export const useEditProduct = create<EditProducState>((set) => ({
  slug: undefined,
  isOpen: false,
  onOpen: (slug: string) => set({ slug: slug, isOpen: true }),
  onClose: () => set({ slug: undefined, isOpen: false }),
}));
