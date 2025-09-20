import Lottie from 'react-lottie-player/dist/LottiePlayerLight'
import waveLoop from '../assets/lottiefiles/Wave Loop.json'

const VoiceWave = () => {

  return (
    <Lottie
      animationData={waveLoop}
      loop
      play
      className={`absolute translate-y-[100px] w-full`} />
  )
}

export default VoiceWave