import { useEffect } from "react";
import useStorageStore from "../../stores/useStorageStore";
import useSummary from "../../hooks/useSummary";
import { motion } from "framer-motion";
import useOpacity from "../../hooks/useOpacity";
import useTts from "../../hooks/useTts";
import { PulseLoader } from "react-spinners";

const Summary = () => {

  const {
    summary,
  } = useStorageStore();

  const { opacity, changeStep } = useOpacity();
  const { getSummary, isPending: summaryPending } = useSummary();
  const { tts, stopTts } = useTts();

  const summaryTts = async (summary: string) => {
    await tts('페이지 요약입니다 ' + summary + ' 이 페이지에서 궁금하신 내용이 있다면 엔터를 눌러주세요');
  }

  const getSummaryAndTts = async () => {
    const newSummary = await getSummary();
    await summaryTts(newSummary);
  }

  useEffect(() => {
    if (summary.trim() === "") {
      try {
        getSummaryAndTts();
      } catch (error) {
        alert(error)
      }
    }
    else {
      summaryTts(summary)
    }
  }, [summary])

  useEffect(() => {
    if (summary.trim() === "") {
      tts('페이지를 요약중입니다')
    }
    return () => stopTts()
  }, [])

  useEffect(() => {
    const handleEnter = (e: KeyboardEvent) => {
      console.log(e.code)
      if (e.code === "Enter" && !summaryPending) {
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
      {(summaryPending || summary.trim() === "") ? (
        <p className={`text-[24px] text-center extrabold`}>요약하는 중입니다</p>
      ) : (
        <p className={`text-[24px] text-center extrabold`}>요약을 읽는 중입니다</p>
      )}
      <div className={`text-[14px] px-[24px] py-[28px] bg-gradient-to-b from-[#201D43] to-[#491CB4] border-[#AEA2EC] border border-gradient-to-t shadow-[0_4px_6px_rgba(0,0,0,0.2)] rounded-[10px] grow shrink-0`}>
        {summaryPending ? (
          <div className={`flex flex-col w-full h-full justify-center items-center`}>
            <PulseLoader
              color="#ffffff"
              loading
              margin={4}
              speedMultiplier={0.5}
            />
          </div>
        ) : (
          summary?.trim() !== "" && (
            <p className={`whitespace-pre-wrap overflow-auto`}>
              {summary}
            </p>
          )
        )}
      </div>
    </motion.div>
  )
}

export default Summary;