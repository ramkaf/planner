import { randomBytes, randomInt } from 'crypto';

export function generateSecureRandomToken(): string {
  return randomBytes(16).toString('hex'); // 16 bytes = 32 hexadecimal characters
}

export function generateRandomDigit(digit:number): string {
    return randomInt(Math.pow(10, digit - 1), Math.pow(10, 6)).toString(); // Generates a number between 100000 and 999999
  }