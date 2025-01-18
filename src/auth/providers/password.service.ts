import * as bcrypt from 'bcrypt';
import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/providers/users.service';
import { EmailService } from '../../mailer/providers/mailer.service';
import { PasswordReset } from '../../auth/entities/password-reset.entity';
import { ResetPassowrdDto } from '../dto/reset-password.dto';
import { generateSecureRandomToken } from '../../common/utils/base.utils';

@Injectable()
export class PasswordService {
  private readonly saltRounds: number;

  constructor(
    private readonly userService: UsersService,
    private readonly mailerService: EmailService,
    @InjectRepository(PasswordReset)
    private readonly passwordResetRepository: Repository<PasswordReset>,
  ) {
    this.saltRounds = 10;
  }

  private async findPasswordResetByToken(
    token: string,
  ): Promise<PasswordReset> {
    return await this.passwordResetRepository.findOne({
      where: {
        token,
        isUsed: false,
      },
    });
  }
  public async hashPassword(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (error) {
      throw new InternalServerErrorException('Error hashing password');
    }
  }
  public async comparePasswords(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new InternalServerErrorException('Error comparing passwords');
    }
  }
  public async sendResetPasswordEmail(identifier: string): Promise<boolean> {
    try {
      const user = await this.userService.findByCredentials(identifier);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const token = generateSecureRandomToken();
      const passwordReset = this.passwordResetRepository.create({
        token,
        userId: user.id,
      });

      await this.passwordResetRepository.save(passwordReset);
      await this.mailerService.sendPasswordReset(user, token);

      return true;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new InternalServerErrorException(
        'Error sending reset password email',
      );
    }
  }
  public async resetPasswordPage(token: string): Promise<PasswordReset> {
    const passwordReset = await this.findPasswordResetByToken(token);

    if (!passwordReset) {
      throw new NotFoundException('Password reset token not found');
    }

    if (passwordReset.expiresAt < new Date()) {
      throw new BadRequestException('Password reset link has expired');
    }

    return passwordReset;
  }
  public async resetPassword(
    token: string,
    resetPasswordDto: ResetPassowrdDto,
  ): Promise<boolean> {
    try {
      const passwordReset = await this.resetPasswordPage(token);
      const user = await this.userService.findById(passwordReset.userId);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const hashedPassword = await this.hashPassword(resetPasswordDto.password);
      user.password = hashedPassword;

      await this.userService.save(user);

      passwordReset.isUsed = true;
      await this.passwordResetRepository.save(passwordReset);

      return true;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new InternalServerErrorException('Error resetting password');
    }
  }
}
