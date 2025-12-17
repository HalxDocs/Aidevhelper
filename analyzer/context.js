export function getWebsiteContext() {
    try {
        const title = document.title || "";
        const url = window.location.href || "";

        const metaDesc = document.querySelector("meta[name='description']");
        const desc = metaDesc ? metaDesc.content : "";

        return `
URL: ${url}
TITLE: ${title}
DESCRIPTION: ${desc}
        `.trim();

    } catch {
        return "No context available.";
    }
}
