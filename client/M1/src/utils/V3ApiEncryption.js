import forge from 'node-forge';

const publicKeyPemV3 = `
    -----BEGIN PUBLIC KEY-----
        ${import.meta.env.VITE_APIV3_PUBLICKEY}
    -----END PUBLIC KEY-----
    `.trim();

export function encryptText(text) {
    // Convert PEM encoded public key to Forge public key object
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPemV3);

    // Encrypt the inputData using RSA
    const encryptedData = publicKey.encrypt(forge.util.encodeUtf8(text), 'RSA-OAEP', {
        md: forge.md.sha1.create(),
        mgf1: forge.mgf1.create(forge.md.sha1.create())
    });

    // Convert encrypted data to Base64
    const encryptedBase64 = forge.util.encode64(encryptedData);

    return encryptedBase64;
}
