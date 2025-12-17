// =======================================================
// AI DEV HELPER — CONTENT SCRIPT (FINAL FIXED VERSION)
// =======================================================

let sidebarInjected = false;

function injectSidebar() {
  if (sidebarInjected) return;
  sidebarInjected = true;

  const iframe = document.createElement("iframe");
  iframe.id = "ai-dev-sidebar";
  iframe.src = chrome.runtime.getURL("sidebar/sidebar.html");

  Object.assign(iframe.style, {
    position: "fixed",
    top: "0",
    right: "0",
    width: "0px",
    height: "100vh",
    border: "none",
    zIndex: "999999999999",
    transition: "width 0.25s ease"
  });

  document.body.appendChild(iframe);
  window.AIDevSidebar = iframe;
}

function openSidebar() {
  if (window.AIDevSidebar) {
    window.AIDevSidebar.style.width = "380px";
  }
}

window.addEventListener("message", (e) => {
  if (e.data?.type === "CLOSE_SIDEBAR") {
    if (window.AIDevSidebar) {
      window.AIDevSidebar.style.width = "0px";
    }
  }
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === "AI_ACTION") {
    injectSidebar();
    openSidebar();

    window.AIDevSidebar.contentWindow.postMessage({
      type: "RUN_AI",
      action: msg.action,
      payload: msg.payload
    }, "*");
  }
});

// ========================
// LOAD MODULES DYNAMICALLY
// ========================

let initCodeDetector, replaceCodeOnPage, generateDiff, saveHistory;
let createAIBubble, initGitHubEnhancer, initAutocomplete, initVoice, initErrorDetector;

(async () => {
  initCodeDetector = (await import(chrome.runtime.getURL("content/detector.js"))).initCodeDetector;
  replaceCodeOnPage = (await import(chrome.runtime.getURL("content/injector.js"))).replaceCodeOnPage;
  generateDiff = (await import(chrome.runtime.getURL("content/diff.js"))).generateDiff;
  saveHistory = (await import(chrome.runtime.getURL("content/history.js"))).saveHistory;

  createAIBubble = (await import(chrome.runtime.getURL("bubble/bubble.js"))).createAIBubble;
  initGitHubEnhancer = (await import(chrome.runtime.getURL("github/github-enhancer.js"))).initGitHubEnhancer;
  initAutocomplete = (await import(chrome.runtime.getURL("autocomplete/autocomplete.js"))).initAutocomplete;
  initVoice = (await import(chrome.runtime.getURL("voice/voice.js"))).initVoice;
  initErrorDetector = (await import(chrome.runtime.getURL("analyzer/error-detector.js"))).initErrorDetector;

  setTimeout(initCodeDetector, 1000);
  setTimeout(createAIBubble, 1300);
  setTimeout(initGitHubEnhancer, 1600);
  setTimeout(initAutocomplete, 2000);
  setTimeout(initVoice, 2300);
  setTimeout(initErrorDetector, 2600);
})();

// ========================
// MESSAGE ROUTER
// ========================
window.addEventListener("message", async (e) => {
  const data = e.data;
  if (!data?.type) return;

  if (data.type === "AI_ACTION_FROM_PAGE") {
    injectSidebar();
    openSidebar();

    const result = await import(chrome.runtime.getURL("ai/hybrid.js"))
      .then(mod => mod.runHybridAI(data.action, data.payload));

    saveHistory({ type: data.action, input: data.payload, output: result });

    window.AIDevSidebar.contentWindow.postMessage({
      type: "AI_RESPONSE",
      result,
      original: data.payload,
      selector: data.elementSelector
    }, "*");

    return;
  }

  if (data.type === "SIDEBAR_REQUEST") {
    const result = await import(chrome.runtime.getURL("ai/hybrid.js"))
      .then(mod => mod.runHybridAI(data.action, data.payload));

    saveHistory({ type: data.action, input: data.payload, output: result });

    window.AIDevSidebar.contentWindow.postMessage({
      type: "AI_RESPONSE",
      result
    }, "*");

    return;
  }

  if (data.type === "INJECT_REWRITE") {
    const ok = replaceCodeOnPage(data.selector, data.newCode);
    window.AIDevSidebar.contentWindow.postMessage({
      type: "INJECTION_STATUS",
      ok
    }, "*");
    return;
  }

  if (data.type === "AI_AUTOCOMPLETE_TRIGGER") {
    injectSidebar();
    openSidebar();

    window.AIDevSidebar.contentWindow.postMessage({
      type: "OPEN_AUTOCOMPLETE"
    }, "*");

    return;
  }

  if (data.type === "JS_ERROR_DETECTED") {
    injectSidebar();
    openSidebar();

    const result = await import(chrome.runtime.getURL("ai/hybrid.js"))
      .then(mod => mod.runHybridAI("fix", data.payload));

    saveHistory({ type: "auto-debug", input: data.payload, output: result });

    window.AIDevSidebar.contentWindow.postMessage({
      type: "AI_RESPONSE",
      result
    }, "*");

    return;
  }
});

console.error = new Proxy(console.error, {
  apply(target, thisArg, args) {
    target.apply(thisArg, args);
    window.postMessage({
      type: "JS_ERROR_DETECTED",
      payload: args.join(" ")
    });
  }
});
