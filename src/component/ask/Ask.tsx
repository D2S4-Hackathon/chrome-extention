import { motion } from 'framer-motion';
import useTts from '../../hooks/useTts';
import useOpacity from '../../hooks/useOpacity';
import { useEffect } from 'react';
import MicIcon from '../../assets/svgs/microphone.svg?react'
import VoicePulse from './VoicePulse';
import useRecord from '../../hooks/useRecord';
import useStorageStore from '../../stores/useStorageStore';
import useSessionStore from '../../stores/useSessionStore';

const Ask = () => {

  const {
    pending
  } = useSessionStore();

  const { opacity, changeStep } = useOpacity();
  const { tts, stopTts } = useTts();

  const { ask, setAsk } = useStorageStore();

  const {
    isRecording,
    isPendingAnswer,
    startRecording,
    stopRecording,
    askGpt,
  } = useRecord();

  useEffect(() => {
    const handleBackspace = (e: KeyboardEvent) => {
      if (e.code === "Backspace") {
        stopTts()
        changeStep('summary')
      }
    };
    const handleSpace = (e: KeyboardEvent) => {
      if (e.key === " " || e.code === "Space") {
        e.preventDefault()
        stopTts() // 항상 TTS 정지
        if (!isRecording) {
          startRecording()
        } else {
          // 이미 녹음중이면 녹음 종료 후 처리
          stopRecording()
          alert(ask)
          tts(ask)
        }
      }
    };


    window.addEventListener("keydown", handleBackspace);
    window.addEventListener("keydown", handleSpace);

    return () => {
      window.removeEventListener("keydown", handleBackspace);
      window.removeEventListener("keydown", handleSpace);
    };
  }, []);

  useEffect(() => {
    tts('스페이스바를 누른 후 원하시는 정보를 말씀하시고 스페이스바를 다시 눌러 중지해주세요 백스페이스를 통해 요약 내용을 다시 들을 수 있습니다')
    return () => stopTts()
  }, [])

  useEffect(() => {
    const getAnswer = async () => {
      await askGpt()
      setAsk("")
      if (pending.trim() === '') {
        changeStep('answer')
      }
    }
    if (ask.trim() !== "") {
      getAnswer();
    }
  }, [ask, pending])

  return (
    <motion.div
      className={`flex flex-col items-center gap-[20px] w-[440px] h-[500px] max-h-[500px]`}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}>

      <p className={`text-[24px] text-center extrabold`}>보이스 검색</p>

      <motion.div
        style={{ height: 320 }}
        className={`flex flex-col justify-center items-center text-[14px] px-[24px] py-[28px] bg-gradient-to-b from-[#201D43] to-[#491CB4] border-[#AEA2EC] border shadow-[0_4px_6px_rgba(0,0,0,0.2)] rounded-[10px] shrink-0`}>
        <div className={`flex flex-col gap-[16px]`}>
          <div className={`relative w-[290px] h-[290px]`}>
            <MicIcon
              className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-1/2 h-1/2 shadow-[0_0_10px_rgba(0,0,0,0.6),0_0_100px_rgba(255,255,255,0.4)] rounded-full z-20 cursor-pointer`}
              onClick={isRecording ? stopRecording : startRecording} />
            <VoicePulse />
          </div>
          <p className={`text-[14px] p-[10px] text-center bold`}>{isPendingAnswer ? `말씀하신 내용을 정리하는 중이에요` : (isRecording ? '지금 듣고있어요' : '원하시는 정보를 말씀해주세요')}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Ask;