chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === 'GET_LINKS' && message.tabId) {
        chrome.scripting.executeScript({
            target: { tabId: message.tabId },
            files: ['content.js']
        }, () => {
            chrome.tabs.sendMessage(
              message.tabId, 
              { type: 'RUN_GET_LINKS' },
              (response: LinkItem[]) => {
                sendResponse(response);
              }
            );
        });
    }
    return true;
});