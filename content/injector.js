// =====================================================
//  CODE INJECTOR — Replace Original Code on Page
// =====================================================

export function replaceCodeOnPage(selector, newCode) {
    try {
        const el = document.querySelector(selector);
        if (!el) return false;

        el.textContent = newCode;
        return true;
    } catch (err) {
        console.error("Injector Error:", err);
        return false;
    }
}
