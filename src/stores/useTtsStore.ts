import { create } from 'zustand'

interface TtsState {
  audio: HTMLAudioElement | null
  isPlaying: boolean
  audioUrl: string | null;
  play: () => void;
  pause: () => void;

  setAudioSrc: (url: string) => void;

  setAudio: (audio: HTMLAudioElement | null) => void
  setPlaying: (playing: boolean) => void
  setAudioUrl: (value: string) => void;
}

const useTtsStore = create<TtsState>((set, get) => {

  const sharedAudio = new Audio();

  return {
    audio: sharedAudio,
    isPlaying: false,
    audioUrl: null,

    setAudioSrc: (url: string) => {
      sharedAudio.src = url;
      sharedAudio.currentTime = 0;
    },

    play: () => {
      const audio = get().audio;
      if (audio) {
        audio?.play();
        set({ isPlaying: true });
        audio.onended = () => set({ isPlaying: false });
      }
    },
    pause: () => {
      const audio = get().audio;
      if (audio) {
        audio.pause();
        set({ isPlaying: false });
      }
    },

    setAudio: (audio) => set({ audio }),
    setPlaying: (playing) => set({ isPlaying: playing }),
    setAudioUrl: (value) => set({ audioUrl: value }),
  }
})

export default useTtsStore