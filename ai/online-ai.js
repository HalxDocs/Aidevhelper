export async function onlineAI(prompt) {
    const { apiKey, provider = "openai" } = await chrome.storage.sync.get([
        "apiKey",
        "provider"
    ]);

    if (!apiKey) return null;

    switch (provider) {
        case "openai": return callOpenAI(apiKey, prompt);
        case "deepseek": return callDeepSeek(apiKey, prompt);
        case "gemini": return callGemini(apiKey, prompt);
        case "claude": return callClaude(apiKey, prompt);
        case "groq": return callGroq(apiKey, prompt);
        default: return null;
    }
}

// OPENAI
async function callOpenAI(key, prompt) {
    try {
        const r = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${key}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const d = await r.json();
        return d.choices?.[0]?.message?.content || null;
    } catch { return null; }
}

// DEEPSEEK
async function callDeepSeek(key, prompt) {
    try {
        const r = await fetch("https://api.deepseek.com/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${key}`
            },
            body: JSON.stringify({
                model: "deepseek-chat",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const d = await r.json();
        return d.choices?.[0]?.message?.content || null;
    } catch { return null; }
}

// GEMINI
async function callGemini(key, prompt) {
    try {
        const r = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${key}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            }
        );

        const d = await r.json();
        return d.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch { return null; }
}

// CLAUDE
async function callClaude(key, prompt) {
    try {
        const r = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": key,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-3-sonnet-20240229",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 4096
            })
        });

        const d = await r.json();
        return d.content?.[0]?.text || null;
    } catch { return null; }
}

// GROQ
async function callGroq(key, prompt) {
    try {
        const r = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${key}`
            },
            body: JSON.stringify({
                model: "mixtral-8x7b-32768",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const d = await r.json();
        return d.choices?.[0]?.message?.content || null;
    } catch { return null; }
}
