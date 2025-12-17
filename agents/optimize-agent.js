export function optimizeAgent(code) {
    return `
You are OptimizeAgent.

Rewrite this code to be:
- Faster
- Cleaner
- More modern
- More readable
- Using best practices

Then explain what you optimized:

${code}
    `.trim();
}
