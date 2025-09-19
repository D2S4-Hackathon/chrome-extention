import { useState, useRef, useEffect } from "react";

export default function Recorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const [innerText, setInnerText] = useState<string>("");

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);

  // 녹음 시작
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event: BlobEvent) => {
        if (event.data && event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error("마이크 접근 실패:", err);
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

  // 🔧 언마운트 시 스트림 정리
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // 현재 페이지 텍스트 가져오기
  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0]?.id;
      if (!tabId) return;

      chrome.scripting.executeScript(
        {
          target: { tabId },
          func: () => document.body.innerText
        },
        (results) => {
          if (chrome.runtime.lastError) {
            console.error("페이지 텍스트 가져오기 실패:", chrome.runtime.lastError.message);
            return;
          }
          if (results && results[0]?.result) {
            setInnerText(results[0].result);
          }
        }
      );
    });
  }, []);

  return (
    <div className="p-4">
      <h1>🎙️ 음성 녹음</h1>
      <p style={{ whiteSpace: "pre-wrap", maxHeight: 200, overflow: "auto" }}>
        {innerText}
      </p>

      {!isRecording ? (
        <button onClick={startRecording}>녹음 시작</button>
      ) : (
        <button onClick={stopRecording}>녹음 종료</button>
      )}

      {audioURL && (
        <div>
          <h2>재생 & 다운로드</h2>
          <audio src={audioURL} controls />
          <a href={audioURL} download="recording.webm">
            다운로드
          </a>
        </div>
      )}
    </div>
  );
}
