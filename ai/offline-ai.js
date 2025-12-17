export function offlineAI(prompt) {
    return `
📡 Offline Mode (Rule-Based)

⚙️ Offline Response:
${basicExplain(prompt)}
    `.trim();
}

function basicExplain(text) {
    if (!text) return "No input received.";
    if (text.includes("class")) return "This is a class — OOP structure.";
    if (text.includes("function")) return "This defines a function.";
    if (text.includes("=>")) return "This is a JavaScript arrow function.";
    return "General text detected.";
}
