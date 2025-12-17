// =====================================================
//  HISTORY STORAGE — Saves AI Input & Output
// =====================================================

export async function saveHistory(entry) {
    const { aiHistory = [] } = await chrome.storage.local.get("aiHistory");

    aiHistory.push({
        ...entry,
        timestamp: Date.now()
    });

    await chrome.storage.local.set({ aiHistory });
}
