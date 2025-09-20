import axios from "axios";
import useStorageStore from "../stores/useStorageStore";
import { useState } from "react";

const useSummary = () => {

  const {
    innerText,
    setSummary,
  } = useStorageStore();

  const [isPending, setIsPending] = useState<boolean>(false);

  // 요약 API
  const getSummary = async () => {
    if (innerText.trim() !== "") {
      
      setIsPending(true)
      
      try {
        const response = await axios.post("http://localhost:8000/summary/text",
          {
            text: innerText,
            language: "ko"
          }
        )
        setSummary(response.data.summary)
        return response.data.summary
      } catch (error) {
        alert(error)
      } finally {
        setIsPending(false)
      }
    }
  }

  return {
    getSummary,
    isPending
  }
}

export default useSummary;
