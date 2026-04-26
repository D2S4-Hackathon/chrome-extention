import { create } from "zustand";
import { persist, createJSONStorage, type StateStorage } from "zustand/middleware";

// chrome.storage용 커스텀 스토리지 어댑터
const chromeStorageAdapter: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const result = await chrome.storage.local.get(name);
    return result[name] || null;
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await chrome.storage.local.set({ [name]: value });
  },
  removeItem: async (name: string): Promise<void> => {
    await chrome.storage.local.remove(name);
  },
};

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
      storage: createJSONStorage(() => chromeStorageAdapter),
    }
  ),
);

export default useStorageStore;
