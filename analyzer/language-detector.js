export function detectLanguage(text) {
    if (!text) return "unknown";

    text = text.trim();

    if (text.startsWith("function") || text.includes("console.log") || text.includes("=>"))
        return "javascript";

    if (text.includes("class") && text.includes("public"))
        return "java";

    if (text.includes("def ") || text.includes("import "))
        return "python";

    if (text.includes("<div") || text.includes("</"))
        return "html";

    if (text.includes("SELECT") || text.includes("FROM"))
        return "sql";

    return "unknown";
}
