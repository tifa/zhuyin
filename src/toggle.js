chrome.action.onClicked.addListener(async (tab) => {
  const data = await chrome.storage.sync.get('enabled');
  const enabled = !data.enabled;

  await chrome.storage.sync.set({ enabled });

  chrome.action.setIcon({
    path: enabled ? {
      16: "images/icon-on-16.png",
      32: "images/icon-on-32.png",
      48: "images/icon-on-48.png",
      128: "images/icon-on-128.png"
    } : {
      16: "images/icon-off-16.png",
      32: "images/icon-off-32.png",
      48: "images/icon-off-48.png",
      128: "images/icon-off-128.png"
    },
    tabId: tab.id
  });

  if (tab.url && tab.url.startsWith("http")) {
    chrome.tabs.sendMessage(tab.id, { enabled }, (response) => {
      if (chrome.runtime.lastError) {
        console.warn(
          "Content script not available in this tab:",
          chrome.runtime.lastError.message
        );
      }
    });
  }
  console.log('Zhuyin extension enabled:', enabled);
});
