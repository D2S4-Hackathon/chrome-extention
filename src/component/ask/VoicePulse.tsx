import { motion } from "framer-motion";

export default function VoicePulse() {
  // 3개의 원이 간격을 두고 무한 반복
  return (
    <div className={`absolute`}>
      {[0, 0.5, 1].map((delay, i) => (
        <motion.div
          key={i}
          animate={{ scale: [0.5, 0.5, 1], opacity: [0, 0.5, 0] }}
          transition={{
            duration: 2,
            times: [0, 0.2, 1],
            delay: delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeOut",
          }}
          className={`absolute top-0 left-0 rounded-full bg-[#92D9F3] w-[290px] h-[290px] top-1/2 left-1/2`}/>
      ))}
    </div>
  );
}
