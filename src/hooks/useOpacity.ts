import { useState } from "react";
import useStepStore from "../stores/useStepStore";

const useOpacity = () => {

  const {
    setStep,
  } = useStepStore();

  const [opacity, setOpacity] = useState(1);

  const changeStep = (step: Step) => {
    setOpacity(0)
    setTimeout(() => {
      setStep(step)
    }, 1000);
  }

  return {
    opacity,
    changeStep,
  }
}

export default useOpacity;