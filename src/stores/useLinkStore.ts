import { create } from "zustand";

interface LinkState {
  links: LinkItem[];
  isLinkEmpty: boolean;

  setLinks: (value: LinkItem[]) => void;
  setIsLinkEmpty: (value: boolean) => void
}

const useLinkStore = create<LinkState>((set) => ({
  links: [],
  isLinkEmpty: false,

  setLinks(value) {
    set({ links: value }) 
  },
  setIsLinkEmpty(value) {
    set({ isLinkEmpty: value })
  },
}));

export default useLinkStore;
