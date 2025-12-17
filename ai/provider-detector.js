export function detectProvider(key) {
    if (key.startsWith("sk-")) return "openai";
    if (key.startsWith("ds-")) return "deepseek";
    if (key.startsWith("gk-")) return "gemini";
    if (key.startsWith("anthropic")) return "claude";
    if (key.startsWith("gqq")) return "groq";
    return "openai";
}
