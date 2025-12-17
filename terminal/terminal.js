// =====================================================
//  TERMINAL ASSISTANT — AI explains terminal commands
// =====================================================

export function initTerminal() {
    const btn = document.createElement("button");
    btn.id = "ai-terminal-btn";
    btn.textContent = ">_";

    Object.assign(btn.style, {
        position: "fixed",
        bottom: "90px",
        right: "25px",
        background: "#222",
        color: "#fff",
        padding: "10px 14px",
        borderRadius: "8px",
        cursor: "pointer",
        border: "none",
        fontSize: "16px",
        zIndex: 999999999
    });

    btn.onclick = () => {
        const cmd = prompt("Enter terminal command:");
        if (!cmd) return;

        window.postMessage({
            type: "SIDEBAR_REQUEST",
            action: "terminal-help",
            payload: cmd
        });
    };

    document.body.appendChild(btn);
}
