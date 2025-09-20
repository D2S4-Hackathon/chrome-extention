import { create } from "zustand";

interface SessionState {
  context: string;
  setContext: (value: string) => void;
  
  pending: string;
  setPending: (value: string) => void;
  
  news: string;
  setNews: (value: string) => void;
}

const useSessionStore = create<SessionState>((set) => ({
  context: '',
  setContext(value) {
    set({ context: value })
  },
  
  pending: '',
  setPending(value) {
    set({ context: value })
  },

  news: '',
  setNews(value) {
    set({ context: value })
  },
}));

export default useSessionStore;
