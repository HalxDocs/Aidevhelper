// =====================================================
//  DIFF GENERATOR (Simple Line Diff)
// =====================================================

export function generateDiff(oldText, newText) {
    const oldLines = oldText.split("\n");
    const newLines = newText.split("\n");

    let diff = "";

    for (let i = 0; i < Math.max(oldLines.length, newLines.length); i++) {
        const oldLine = oldLines[i] || "";
        const newLine = newLines[i] || "";

        if (oldLine === newLine) {
            diff += `  ${oldLine}\n`;
        } else {
            diff += `- ${oldLine}\n+ ${newLine}\n`;
        }
    }

    return diff.trim();
}
