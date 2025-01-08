import {
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { EmailVerification } from '../entities/email-verification.entity';
import { EmailService } from 'src/mailer/providers/mailer.service';
import { UsersService } from './users.service';
import { generateRandomDigit } from 'src/common/utils/base.utils';

@Injectable()
export class VerificationService {
  constructor(
    @InjectRepository(EmailVerification)
    private readonly emailVerificationRepository: Repository<EmailVerification>,
    private readonly mailerService:EmailService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  save(emailVerificationService: Partial<EmailVerification>): Promise<EmailVerification> {
    return this.emailVerificationRepository.save(emailVerificationService);
  }

  async prepareVerificationSchemaBeforeSending(userId:number) {
    const code = generateRandomDigit(6);
    const emailVerificationSchema = {
        userId,
        code,
        isVerified: false
    }
    return await this.emailVerificationRepository.save(this.emailVerificationRepository.create(emailVerificationSchema))
  }
  async sendVerificationEmail (user:User , emailVerification:EmailVerification){
    this.mailerService.sendVerificationEmail(user , emailVerification.code)
    return true
  }
  async deletePendingVerificationEmails(userId: number) {
    await this.emailVerificationRepository.delete({
      userId: userId,
      isVerified: false,
    });
  }
  async findVerification (userId:number , code:string):Promise<EmailVerification | null >{
    const emailVerification = await this.emailVerificationRepository.findOne({
      where: {
        userId,
        code,
        isVerified: false
      },
    });
    return emailVerification
  }
  async saveEmailVerificationResult(emailVerification:EmailVerification){
    emailVerification.isVerified = true
    await this.emailVerificationRepository.save(emailVerification)
    const user = await this.userService.findById(emailVerification.userId)
    user.isEmailVerified = true
    await this.userService.save(user)
    return true
  }
}
