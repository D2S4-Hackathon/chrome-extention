import axios from "axios";
import { useState, useRef, useEffect } from "react";


// import MicrophoneIcon from '../assets/svgs/microphone.svg?react'
import useStorageStore from "../stores/useStorageStore";

export default function Recorder() {
  const {
    ask,
    answer,
    setAsk,
    setAnswer,
  } = useStorageStore();

  const [isRecording, setIsRecording] = useState(false);
  const [isPendingStt, setIsPendingStt] = useState(false);
  const [isPendingAnswer, setIsPendingAnswer] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // 녹음 시작
  const startRecording = async () => {
    try {
      setIsPendingStt(true)
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // 녹음용 MediaRecoder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        // 음성 파일 (추후 서버에 보낼 blob)
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });

        const formData = new FormData();
        formData.append("audio_file", blob)
        formData.append("lang", "Kor")

        const response: SttResponse = await axios.post('http://localhost:8000/stt', formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
        setAsk(response.data.text || "")
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("마이크 접근 실패:", err);
    } finally {
      setIsPendingStt(false)
    }
  };

  // 녹음 종료
  const stopRecording = () => {
    const mediaRecorder = mediaRecorderRef.current;
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
    }
    setIsRecording(false);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // 페이지에 대한 질문
  const askGpt = async () => {
    try {
      setIsPendingAnswer(true)
      const response = await axios.post('http://localhost:8000/content/ask',
        {
          query: ask
        })
      setAnswer(response.data.response)
      if (response.data.url) {
        chrome.tabs.create({ url: response.data.url });
      }
    } catch (error) {
      alert(error)
    } finally {
      setIsPendingAnswer(false)
    }
  }

  // 🔧 언마운트 시 스트림 정리
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div className="p-4 flex flex-col items-center">
      <h1>🎙️ 음성 녹음</h1>
      {!isRecording ? (
        <button onClick={startRecording} disabled={isPendingStt || isPendingAnswer}>녹음 시작</button>
      ) : (
        <button onClick={stopRecording}>녹음 종료</button>
      )}
      {isPendingStt ? (
        <>TTS 요청중</>
      ) : (
        !isPendingStt && ask.trim() !== "" && (
          <>{ask}</>
        )
      )}
      <button onClick={askGpt} disabled={isRecording || isPendingStt || isPendingAnswer}>물어보기</button>
      {answer.trim() !== "" &&
        <p>
          {answer}
        </p>
      }
    </div>
  );
}
