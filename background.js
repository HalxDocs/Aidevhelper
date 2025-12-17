// AI DEV HELPER – BACKGROUND SERVICE WORKER (FINAL)

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.removeAll(() => {
    const actions = [
      { id: "explain", title: "Explain Code" },
      { id: "fix", title: "Fix Code" },
      { id: "rewrite", title: "Rewrite Cleaner" },
      { id: "optimize", title: "Optimize Performance" },
      { id: "chat", title: "Open AI Chat Sidebar" }
    ];

    actions.forEach(a => {
      chrome.contextMenus.create({
        id: a.id,
        title: a.title,
        contexts: ["selection", "page", "editable"]
      });
    });
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.sendMessage(tab.id, {
    type: "AI_ACTION",
    action: info.menuItemId,
    payload: info.selectionText || ""
  });
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, {
    type: "AI_ACTION",
    action: "chat",
    payload: ""
  });
});
