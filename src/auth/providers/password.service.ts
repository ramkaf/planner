import * as bcrypt from 'bcrypt';

export class PasswordService {
  private readonly saltRounds: number = 10; // Adjust the number of salt rounds as needed

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }
  async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
