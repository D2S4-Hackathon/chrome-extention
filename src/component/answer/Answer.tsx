import { useEffect } from "react";
import useStorageStore from "../../stores/useStorageStore";
import { motion } from "framer-motion";
import useOpacity from "../../hooks/useOpacity";
import useTts from "../../hooks/useTts";

const Answer = () => {

  const {
    answer
  } = useStorageStore();

  const { opacity, changeStep } = useOpacity();
  const { tts, stopTts } = useTts();

  useEffect(() => {
    tts(answer + '더 원하시는 정보가 있다면 엔터를 눌러주세요')
    return () => stopTts()
  }, [])

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      console.log(e.code)
      if (e.code === "Enter") {
        e.preventDefault();
        changeStep('ask')
      }
    };

    window.addEventListener("keydown", handleEnter);

    return () => {
      window.removeEventListener("keydown", handleEnter);
    };
  }, []);

  return (
    <motion.div
      className={`flex flex-col gap-[20px] w-[440px] h-[500px] max-h-[500px]`}
      initial={{ opacity: 0 }}
      animate={{ opacity }}
      transition={{
        duration: 1,
        ease: "easeInOut",
      }}>

      <p className={`text-[24px] text-center extrabold`}>답을 정리했어요</p>

      <div className={`text-[14px] px-[24px] py-[28px] bg-gradient-to-b from-[#201D43] to-[#491CB4] border-[#AEA2EC] border border-gradient-to-t shadow-[0_4px_6px_rgba(0,0,0,0.2)] rounded-[10px] grow shrink-0`}>

        <p className={`whitespace-pre-wrap overflow-auto`}>
          {answer}
        </p>
      </div>
    </motion.div>
  )
}

export default Answer;