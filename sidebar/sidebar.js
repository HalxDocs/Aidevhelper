// Close sidebar
document.getElementById("close-btn").onclick = () => {
    parent.postMessage({ type: "CLOSE_SIDEBAR" }, "*");
};

// Output element
const output = document.getElementById("output-text");

// Send chat input
document.getElementById("send-btn").onclick = () => {
    sendChat();
};

function sendChat() {
    const text = document.getElementById("chat-input").value.trim();
    if (!text) return;

    sendToHybridAI("chat", text);
    document.getElementById("chat-input").value = "";
}

// Tool buttons
document.querySelectorAll(".tool-btn").forEach(btn => {
    btn.onclick = () => {
        sendToHybridAI(btn.dataset.action, null);
    };
});

// Send request to AI engine
function sendToHybridAI(action, payload) {
    output.textContent = "Processing…";

    parent.postMessage({
        type: "SIDEBAR_REQUEST",
        action,
        payload
    }, "*");
}

// Receive AI response
window.addEventListener("message", (e) => {
    if (e.data.type === "AI_RESPONSE") {
        output.textContent = e.data.result;
    }
});
