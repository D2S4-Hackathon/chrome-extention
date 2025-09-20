import { create } from "zustand";

interface StepState {
  step: Step;

  setStep: (value: Step) => void;
}

const useStepStore = create<StepState>((set) => ({
  step: 'init',
  setStep(value) {
    set({ step: value })
  },
}));

export default useStepStore;
