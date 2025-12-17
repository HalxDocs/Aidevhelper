// =====================================================
//  Voice Mode (Speech → AI Chat)
// =====================================================

export function initVoice() {
    if (!("webkitSpeechRecognition" in window)) {
        console.warn("Speech Recognition not supported.");
        return;
    }

    const recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";

    // Create floating voice button
    createVoiceButton(recognition);
}

function createVoiceButton(recognition) {
    const btn = document.createElement("button");
    btn.id = "ai-voice-btn";

    btn.textContent = "🎤";
    Object.assign(btn.style, {
        position: "fixed",
        bottom: "25px",
        right: "25px",
        background: "#111",
        color: "#fff",
        fontSize: "22px",
        padding: "12px",
        borderRadius: "50%",
        cursor: "pointer",
        border: "none",
        zIndex: 999999999
    });

    btn.onclick = () => {
        btn.textContent = "🎙 Listening…";
        recognition.start();
    };

    recognition.onend = () => {
        btn.textContent = "🎤";
    };

    recognition.onresult = (event) => {
        const text = event.results[0][0].transcript;

        window.postMessage({
            type: "SIDEBAR_REQUEST",
            action: "voice",
            payload: text
        });
    };

    document.body.appendChild(btn);
}
