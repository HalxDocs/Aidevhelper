// =====================================================
//  GitHub Enhancer — PR Review + Code Summary
// =====================================================

export function initGitHubEnhancer() {

    // Only run on GitHub
    if (!location.host.includes("github.com")) return;

    // Add Review button on PR pages
    const checkInterval = setInterval(() => {
        const header = document.querySelector(".gh-header-actions");
        if (header && !document.getElementById("ai-review-btn")) {
            injectReviewButton(header);
            clearInterval(checkInterval);
        }
    }, 800);
}

function injectReviewButton(header) {
    const btn = document.createElement("button");
    btn.id = "ai-review-btn";
    btn.textContent = "🤖 AI Review PR";
    
    Object.assign(btn.style, {
        background: "#0969da",
        color: "white",
        padding: "6px 12px",
        borderRadius: "6px",
        cursor: "pointer",
        border: "none",
        marginLeft: "10px"
    });

    btn.onclick = () => runPRReview();

    header.appendChild(btn);
}

async function runPRReview() {
    const diff = await loadPRDiff();

    // Send message to content.js → sidebar
    window.postMessage({
        type: "AI_ACTION_FROM_PAGE",
        action: "review-pr",
        payload: diff,
        elementSelector: null
    });
}

async function loadPRDiff() {
    try {
        const files = [...document.querySelectorAll(".file")];
        return files.map(f => f.innerText).join("\n\n");
    } catch (e) {
        return "Could not load PR diff.";
    }
}
