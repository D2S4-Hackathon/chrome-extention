import { useEffect } from 'react'
import PlayIcon from '../../assets/svgs/play.svg?react'

import { motion } from 'framer-motion'
import useOpacity from '../../hooks/useOpacity'
import useTts from '../../hooks/useTts'

const Start = () => {

  const {opacity, changeStep} = useOpacity();
  const { tts, stopTts } = useTts();

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      console.log(e.code)
      if (e.code === "Enter") {
        e.preventDefault();
        changeStep('summary')
      }
    };

    window.addEventListener("keydown", handleEnter);

    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, []);

  useEffect(() => {
    tts('페이지를 요약하려면 엔터를 눌러주세요')
    return () => stopTts()
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}
      className={`flex flex-col gap-[10px] justify-start h-full`}>
      <p className={`font-apple-gothic text-[24px] text-center bold pt-[80px]`}>작은 목소리 하나, 새로운 세상의 시작<br />ONier 과 함께해요</p>
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[200px] bg-cover bg-[url('./assets/pngs/Frame.png')] aspect-square rounded-full shadow-[0_0_100px_rgba(125,20,208,0.8),0_0_100px_rgba(255,255,255,0.4)] opacity-80`}>
      </div>
      <PlayIcon className={`absolute w-[100px] h-[100px] left-1/2 -translate-x-2/5 top-1/2 -translate-y-[45%]`} />
    </motion.div>
  )
}

export default Start;