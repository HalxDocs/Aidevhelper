export function initErrorDetector() {
    window.addEventListener("error", (e) => {
        window.postMessage({
            type: "JS_ERROR_DETECTED",
            payload: e.message
        });
    });

    window.addEventListener("unhandledrejection", (e) => {
        window.postMessage({
            type: "JS_ERROR_DETECTED",
            payload: e.reason?.message || "Unhandled Promise Rejection"
        });
    });
}
