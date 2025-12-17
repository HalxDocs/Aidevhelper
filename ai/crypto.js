export async function encrypt(text) {
    return {
        encrypted: btoa(text)
    };
}

export async function decrypt(encoded) {
    return atob(encoded);
}
