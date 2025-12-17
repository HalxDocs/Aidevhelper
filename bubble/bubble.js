// =====================================================
//  FLOATING BUBBLE — Quick AI Access
// =====================================================

export function createAIBubble() {
    if (document.getElementById("ai-bubble")) return;

    const bubble = document.createElement("div");
    bubble.id = "ai-bubble";
    bubble.textContent = "⚡";

    Object.assign(bubble.style, {
        position: "fixed",
        bottom: "25px",
        right: "25px",
        width: "50px",
        height: "50px",
        background: "#111",
        color: "#fff",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 999999999,
        fontSize: "24px",
        userSelect: "none",
        transition: "0.2s"
    });

    bubble.onmouseover = () => bubble.style.transform = "scale(1.1)";
    bubble.onmouseout = () => bubble.style.transform = "scale(1)";

    bubble.onclick = () => {
        window.postMessage({
            type: "AI_ACTION",
            action: "chat",
            payload: ""
        });
    };

    document.body.appendChild(bubble);
}
