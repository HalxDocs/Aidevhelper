import { onlineAI } from "./online-ai.js";
import { offlineAI } from "./offline-ai.js";
import { localLLM_AI } from "./local-llm.js";

import { explainAgent } from "../agents/explain-agent.js";
import { debugAgent } from "../agents/debug-agent.js";
import { optimizeAgent } from "../agents/optimize-agent.js";

export async function runHybridAI(action, payload) {
    const prompt = buildPrompt(action, payload);

    const online = await onlineAI(prompt);
    if (online) return `🌐 Online AI\n\n${online}`;

    const local = await localLLM_AI(prompt);
    if (local) return `🤖 Local Model\n\n${local}`;

    return offlineAI(prompt);
}

function buildPrompt(action, code) {
    switch(action) {
        case "explain": return explainAgent(code);
        case "fix": return debugAgent(code);
        case "rewrite":
        case "optimize": return optimizeAgent(code);
        default: return code;
    }
}
