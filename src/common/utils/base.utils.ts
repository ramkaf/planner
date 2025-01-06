import { randomBytes, randomInt } from 'crypto';

export function generateSecureRandomToken(): string {
  return randomBytes(16).toString('hex'); // 16 bytes = 32 hexadecimal characters
}

export function generateRandomSixDigit(): string {
    return randomInt(100000, 1000000).toString(); // Generates a number between 100000 and 999999
  }