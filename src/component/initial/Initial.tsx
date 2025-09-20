import { motion } from 'framer-motion'

const Initial = () => {

  return (
    <motion.div key="initial">
      <motion.p
        initial={{ opacity: 0.8 }}
        animate={{ opacity: [0.8, 0], scale: [1, 10] }}
        transition={{
          duration: 1,
          times: [0.7, 1],
          ease: "easeInOut"
        }}
        className={`absolute top-[10px] text-[#B983F3] font-krona-one left-1/2 -translate-x-1/2 `}>
        ONIRE
      </motion.p>
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{ opacity: [1, 0], scale: [1, 0.9] }}
        transition={{
          duration: 1,
          times: [0.7, 1],
          ease: "easeInOut",
        }}
        className={`absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-[400px] bg-cover bg-[url('./assets/pngs/Frame.png')] aspect-square rounded-full shadow-[0_0_100px_rgba(125,20,208,0.8),0_0_100px_rgba(255,255,255,0.4)]`}>
        <p className={`font-krona-one text-[#220072] text-[60px] opacity-80 [text-shadow:0_0_5px_rgba(0,0,0,0.2),0_0_10px_rgba(0,0,0,0.2)]`}>ONIRE</p>
        <p className={`text-[16px] bold [text-shadow:0_0_5px_rgba(0,0,0,0.2),0_0_10px_rgba(0,0,0,0.2)]`}>작은 목소리 하나, 새로운 세상의 시작</p>
      </motion.div>
    </motion.div>
  )
}

export default Initial;