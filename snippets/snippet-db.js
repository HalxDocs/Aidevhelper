export async function saveSnippet(title, code) {
  const { snippets = [] } = await chrome.storage.sync.get("snippets");

  snippets.unshift({
    id: Date.now(),
    title,
    code,
    time: new Date().toLocaleString()
  });

  await chrome.storage.sync.set({ snippets });
}

export async function getSnippets() {
  const { snippets = [] } = await chrome.storage.sync.get("snippets");
  return snippets;
}

export async function deleteSnippet(id) {
  const { snippets = [] } = await chrome.storage.sync.get("snippets");
  const filtered = snippets.filter(s => s.id !== id);
  await chrome.storage.sync.set({ snippets: filtered });
}
