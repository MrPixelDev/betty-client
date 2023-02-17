import { ICipher } from "../models/IAuth";

export default class SymEncryptService {
  static async encrypt(plaintext: string): Promise<ICipher> {
    const key = new TextEncoder().encode(process.env.REACT_APP_ENCRYPT_KEY);
    const encodedText = new TextEncoder().encode(plaintext);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      key,
      "AES-GCM",
      false,
      ["encrypt"]
    );
    const iv = crypto.getRandomValues(new Uint8Array(16));
    const cipherText = await crypto.subtle.encrypt(
      { name: "AES-CBC", iv },
      cryptoKey,
      encodedText
    );
    return { cipherText, iv };
  }
}
