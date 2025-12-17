// =====================================================
// AI AUTOCOMPLETE ENGINE — triggered by Alt + Space
// =====================================================

export function initAutocomplete() {
    document.addEventListener("keydown", (e) => {
        if (e.altKey && e.code === "Space") {
            window.postMessage({
                type: "AI_AUTOCOMPLETE_TRIGGER"
            });
        }
    });
}
