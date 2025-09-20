chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
    if (msg.type === "RUN_GET_LINKS") {
        const links = [...document.querySelectorAll("a")].map((a, idx) => ({
            id: idx + 1,
            text: a.innerText.trim(),
            url: a.href
        }));
        sendResponse({ links });
    }
    return true; // 비동기 응답 허용
});