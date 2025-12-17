// =====================================================
//  CODE DETECTOR — Finds Code Blocks & Injects Toolbar
// =====================================================

export function initCodeDetector() {
    const codeBlocks = document.querySelectorAll("pre, code");

    codeBlocks.forEach((block, index) => {
        wrapCodeBlock(block, index);
    });
}

function wrapCodeBlock(block, index) {
    if (block.dataset.aiWrapped) return;

    block.dataset.aiWrapped = "true";
    const selector = `[data-ai-code='${index}']`;

    block.setAttribute("data-ai-code", index);

    injectToolbar(block, selector);
}

function injectToolbar(block, selector) {
    const bar = document.createElement("div");
    bar.className = "ai-toolbar";

    Object.assign(bar.style, {
        position: "absolute",
        top: "4px",
        right: "4px",
        background: "#111",
        color: "#fff",
        padding: "6px 8px",
        borderRadius: "6px",
        fontSize: "12px",
        display: "flex",
        gap: "6px",
        zIndex: "9999999",
        cursor: "pointer"
    });

    bar.innerHTML = `
        <span data-action="explain">❓</span>
        <span data-action="fix">🛠️</span>
        <span data-action="rewrite">🔁</span>
        <span data-action="optimize">⚡</span>
    `;

    bar.onclick = (e) => handleToolbarClick(e, block.innerText, selector);

    block.style.position = "relative";
    block.parentNode.style.position = "relative";
    block.parentNode.appendChild(bar);
}

function handleToolbarClick(e, code, selector) {
    const action = e.target.dataset.action;
    if (!action) return;

    window.postMessage({
        type: "AI_ACTION_FROM_PAGE",
        action,
        payload: code,
        elementSelector: selector
    });
}
