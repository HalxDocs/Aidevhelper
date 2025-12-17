export function explainAgent(code) {
    return `
You are ExplainAgent.

Explain the following code in a clean, simple way.  
Break it down into:

1. What the code is doing  
2. Each important line  
3. Why a developer would write this  
4. Any improvements

CODE:
${code}
    `.trim();
}
