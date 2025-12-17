// =====================================================
//  SNIPPET MANAGER — Save & Retrieve User Code Snippets
// =====================================================

export async function saveSnippet(name, code) {
    const { snippets = {} } = await chrome.storage.local.get("snippets");

    snippets[name] = {
        code,
        created: Date.now()
    };

    await chrome.storage.local.set({ snippets });
}

export async function listSnippets() {
    const { snippets = {} } = await chrome.storage.local.get("snippets");
    return snippets;
}

export async function deleteSnippet(name) {
    const { snippets = {} } = await chrome.storage.local.get("snippets");

    delete snippets[name];

    await chrome.storage.local.set({ snippets });
}
