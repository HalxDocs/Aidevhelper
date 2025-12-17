export function debugAgent(code) {
    return `
You are DebugAgent.

Your job:
- Find **all bugs**
- Fix them cleanly
- Explain each fix
- Suggest improvements

Analyze this code:

${code}
    `.trim();
}
