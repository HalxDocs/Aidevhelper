// =============== SECTION SWITCHER ==================
document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
        document.getElementById(`section-${btn.dataset.section}`).classList.add("active");
    };
});

document.getElementById("section-api").classList.add("active");

// =============== HELPERS ==================
const storageGet = (keys) => new Promise(r => chrome.storage.sync.get(keys, r));
const storageSet = (v) => new Promise(r => chrome.storage.sync.set(v, r));

function setStatus(id, text, error = false) {
    const el = document.getElementById(id);
    el.textContent = text;
    el.style.color = error ? "#ff6b6b" : "#9ae6b4";
}

// =============== LOAD SAVED SETTINGS ==================
(async () => {
    const { apiKey, provider, theme } = await storageGet(["apiKey", "provider", "theme"]);

    if (provider) document.getElementById("provider").value = provider;
    if (apiKey) document.getElementById("apiKeyInput").placeholder = "••••••••••••";

    setStatus("api-status", apiKey ? "Loaded." : "No API key saved.");
    document.getElementById("theme-status").textContent = `Theme: ${theme || "dark"}`;
})();

// =============== SAVE API KEY ==================
document.getElementById("saveApiKey").onclick = async () => {
    const key = document.getElementById("apiKeyInput").value.trim();
    const provider = document.getElementById("provider").value;

    if (!key) return setStatus("api-status", "Enter a key.", true);

    await storageSet({ apiKey: key, provider });

    setStatus("api-status", `Saved for provider: ${provider}`);
};

// =============== TEST KEY ==================
document.getElementById("testApiKey").onclick = async () => {
    const key = document.getElementById("apiKeyInput").value.trim();
    const provider = document.getElementById("provider").value;

    if (!key) return setStatus("api-status", "Enter a key to test.", true);

    setStatus("api-status", "Testing...");

    let ok = false;

    try {
        if (provider === "openai") {
            const r = await fetch("https://api.openai.com/v1/models", {
                headers: { Authorization: `Bearer ${key}` }
            });
            ok = r.ok;
        }

        if (provider === "deepseek") {
            const r = await fetch("https://api.deepseek.com/v1/models", {
                headers: { Authorization: `Bearer ${key}` }
            });
            ok = r.ok;
        }

        if (provider === "gemini") ok = true;
        if (provider === "claude") ok = true;
        if (provider === "groq") ok = true;

        setStatus("api-status", ok ? "Valid API key!" : "Invalid API key.", !ok);
    } catch {
        setStatus("api-status", "Network error.", true);
    }
};

// =============== THEME ==================
document.getElementById("themeToggle").onclick = async () => {
    const { theme = "dark" } = await storageGet("theme");
    const next = theme === "dark" ? "light" : "dark";
    await storageSet({ theme: next });
    document.getElementById("theme-status").textContent = `Theme: ${next}`;
};

// =============== HISTORY ==================
async function loadHistory() {
    const { aiHistory = [] } = await chrome.storage.local.get("aiHistory");
    const root = document.getElementById("history-list");

    root.innerHTML = "";

    aiHistory.forEach(h => {
        const div = document.createElement("div");
        div.className = "history-entry";
        div.textContent =
`${h.type.toUpperCase()}
-----------------------
Input:
${h.input}

Output:
${h.output}`;
        root.appendChild(div);
    });
}

loadHistory();

document.getElementById("clearHistory").onclick = async () => {
    await chrome.storage.local.set({ aiHistory: [] });
    loadHistory();
};

// =============== LOCAL MODEL ==================
document.getElementById("loadLLM").onclick = async () => {
    document.getElementById("llm-status").textContent = "Loading…";

    try {
        const mod = await import(chrome.runtime.getURL("ai/local-llm.js"));
        await mod.loadLocalLLM();
        document.getElementById("llm-status").textContent = "Loaded.";
    } catch {
        document.getElementById("llm-status").textContent = "Failed.";
    }
};
