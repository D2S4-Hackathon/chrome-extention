import Initial from './component/initial/Initial'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Start from './component/start/Start'
import useStepStore from './stores/useStepStore'
import useDocument from './hooks/useDocument'
import Summary from './component/summary/Summary'
import useStorageStore from './stores/useStorageStore'
import Ask from './component/ask/Ask'
import Answer from './component/answer/Answer'


function App() {

  const {
    step,
    setStep
  } = useStepStore()

  const {
    clear
  } = useStorageStore();

  useDocument();

  useEffect(() => {
    clear()
    setTimeout(() => {
      setStep('start')
    }, 1000);
  }, [])

  return (
    <div className={`relative w-[480px] h-[580px] flex flex-col justify-center items-center`}>

      <AnimatePresence mode="wait">
        {step === 'init' && <Initial key='init' />}
        {step === 'start' && <Start key='start' />}
        {step === 'summary' && <Summary key='summary' />}
        {step === 'ask' && <Ask key='ask' />}
        {step === 'answer' && <Answer key='answer' />}
      </AnimatePresence>
    </div>
  )
}
export default App
