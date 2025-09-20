import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TextState {
  innerText: string;
  summary: string;
  ask: string;
  answer: string;

  setInnerText: (value: string) => void;
  setSummary: (value: string) => void;
  setAsk: (value: string) => void;
  setAnswer: (value: string) => void;

  clear: () => void;
}

const useStorageStore = create<TextState>()(
  persist(
    (set) => ({
      innerText: "",
      summary: "",
      ask: "",
      answer: "",


      setInnerText: (value) => set({ innerText: value }),
      setSummary: (value) => set({ summary: value }),
      setAsk: (value) => set({ ask: value }),
      setAnswer: (value) => set({ answer: value }),
      
      clear: () => set({
        innerText: '',
        summary: '',
        ask: '',
        answer: '',
      })
    }),
    {
      name: "text-storage",
      storage: createJSONStorage(() => localStorage), // <- 이 부분이 포인트
    }
  ),
);

export default useStorageStore;
