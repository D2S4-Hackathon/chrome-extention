import { useCallback, useEffect, useState } from "react";
import useTtsStore from "../stores/useTtsStore";

const useTts = () => {

  const { audio, isPlaying, play, pause, setAudioSrc } = useTtsStore()

  const [isPending, setIsPending] = useState(false);

  const tts = useCallback(async (text: string) => {
    setIsPending(true);
    try {
      const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${import.meta.env.VITE_GOOGLE_API_KEY}`;
      const body = {
        input: { text },
        voice: { languageCode: "ko-KR", ssmlGender: "NEUTRAL" },
        audioConfig: { audioEncoding: "MP3" },
      };

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!data.audioContent) throw new Error("TTS Error");

      const audioUrl = "data:audio/mp3;base64," + data.audioContent;
      setAudioSrc(audioUrl);
      play(); // src 바꾸고 바로 재생
    } catch (err) {
      console.error(err);
    } finally {
      setIsPending(false);
    }
  }, [setAudioSrc, play]);

  const togglePlayPause = () => {
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  const stopTts = useCallback(() => {
    pause();
  }, [pause])

  useEffect(() => {
    window.addEventListener("keydown", togglePlayPause);
    return () => window.removeEventListener("keydown", togglePlayPause);
  })

  return {
    tts,
    isPending,
    stopTts,
    isPlaying,
  }
}

export default useTts;