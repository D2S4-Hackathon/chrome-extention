import { useEffect } from "react";
import useLinkStore from "../stores/useLinkStore";
import useStorageStore from "../stores/useStorageStore";
import axios from "axios";

const useDocument = () => {

  const {
    innerText,
    setInnerText,
  } = useStorageStore();

  const {
    links,
    setLinks,
    isLinkEmpty,
    setIsLinkEmpty,
  } = useLinkStore();

  const postContent = async () => {
    try {
      await axios.post("http://localhost:8000/content/load",
        {
          inner_text: innerText,
          links
        }
      )

    } catch (error) {
      alert(error)
    }
  }

  // 현재 페이지 텍스트 가져오기, 링크 가져오기
  useEffect(() => {
    const getDocument = async () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0]?.id;
        if (!tabId) return;

        chrome.scripting.executeScript(
          {
            target: { tabId },
            func: () => document.body.innerText
          },
          (results) => {
            if (chrome.runtime.lastError) {
              console.error("페이지 텍스트 가져오기 실패:", chrome.runtime.lastError.message);
              alert("페이지 텍스트 가져오기 실패")
              return;
            }
            if (results && results[0]?.result) {
              setInnerText(results[0].result);
            }
          }
        );
      });

      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      })

      chrome.runtime.sendMessage({
        type: "GET_LINKS",
        tabId: tab.id,
      }, (response) => {
        if (response?.links) {
          setLinks(response.links)
          if (response.links.length > 0) {
            setIsLinkEmpty(false)
          }
          else {
            setIsLinkEmpty(true)
          }
        }
        else {
          setIsLinkEmpty(false)
        }
      });
    }
    getDocument();
  }, []);

  useEffect(() => {
    if (innerText.trim() !== "" && (isLinkEmpty || links.length > 0)) {
      postContent();
    }
  }, [innerText, links, isLinkEmpty])
}

export default useDocument;