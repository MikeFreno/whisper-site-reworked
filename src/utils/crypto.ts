import crypto from "crypto";

const keyLength = 32; // for AES-256
const salt = process.env.NaCl as string; // A random salt, you can also use a fixed value
const iterations = 10000; // Number of iterations for key derivation

export function stringToEncryptionKey(userKey: string): Buffer {
  return crypto.pbkdf2Sync(userKey, salt, iterations, keyLength, "sha512");
}

export function encrypt(text: string, encryptionKey: Buffer): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", encryptionKey, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return `${iv.toString("hex")}:${encrypted}`;
}

export function decrypt(text: string, encryptionKey: Buffer): string {
  const [ivHex, encryptedHex] = text.split(":");
  const iv = Buffer.from(ivHex as string, "hex");
  const encrypted = Buffer.from(encryptedHex as string, "hex");
  const decipher = crypto.createDecipheriv("aes-256-cbc", encryptionKey, iv);
  let decrypted = decipher.update(encrypted).toString("utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
