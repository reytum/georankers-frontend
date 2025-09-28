import CryptoJS from 'crypto-js';

// Secret key for encryption - in production, this should be stored securely
// and should be the same on both client and server
// TODO: Move this to environment variables for better security
const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'georankers-secret-key-2024';

// Additional salt for extra security
const SALT = 'georankers-salt-2024';

/**
 * Encrypts a password using AES encryption with salt
 * @param password - The plain text password to encrypt
 * @returns The encrypted password as a string
 */
export const encryptPassword = (password: string): string => {
  try {
    // Add salt to the password for additional security
    const saltedPassword = password + SALT;
    const encrypted = CryptoJS.AES.encrypt(saltedPassword, ENCRYPTION_KEY).toString();
    return encrypted;
  } catch (error) {
    console.error('Error encrypting password:', error);
    throw new Error('Failed to encrypt password');
  }
};

/**
 * Simple password encryption using base64 encoding with salt
 * This is a simpler approach that's easier to implement on the backend
 * @param password - The plain text password to encrypt
 * @returns The encrypted password as a string
 */
export const encryptPasswordSimple = (password: string): string => {
  try {
    // Add salt and encode to base64
    const saltedPassword = password + SALT;
    const encoded = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(saltedPassword));
    return encoded;
  } catch (error) {
    console.error('Error encrypting password:', error);
    throw new Error('Failed to encrypt password');
  }
};

/**
 * Decrypts a password using AES decryption with salt
 * @param encryptedPassword - The encrypted password to decrypt
 * @returns The decrypted password as a string (without salt)
 */
export const decryptPassword = (encryptedPassword: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, ENCRYPTION_KEY);
    const decryptedWithSalt = bytes.toString(CryptoJS.enc.Utf8);
    // Remove the salt from the decrypted password
    const decrypted = decryptedWithSalt.replace(SALT, '');
    return decrypted;
  } catch (error) {
    console.error('Error decrypting password:', error);
    throw new Error('Failed to decrypt password');
  }
};

/**
 * Creates a hash of the password for additional security
 * @param password - The plain text password to hash
 * @returns The hashed password as a string
 */
export const hashPassword = (password: string): string => {
  try {
    return CryptoJS.SHA256(password).toString();
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Failed to hash password');
  }
};
