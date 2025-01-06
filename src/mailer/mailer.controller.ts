import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { EmailService } from './providers/mailer.service';
import { ISendMailOptions, ITemplateEmailConfigVariables } from './interfaces/mailer.interface';

@Controller('mailer')
export class MailerController {
  // constructor(private readonly mailerService: EmailService) {}
  // @Post('test')
  // async testAllEmails() {
  //   try {
  //     const testEmail = 'ramkaf99@gmail.com';
  //     const testName = 'Test User';
  //     const variable : ITemplateEmailConfigVariables['verification']= {
  //       name : testName ,
  //       code : "12",
  //       year: 56
  //     }
  //     await this.mailerService.sendVerificationEmail(testEmail , variable);
  //   } catch (error) {
  //     throw new BadRequestException(`Failed to send test emails: ${error.message}`);
  //   }
  // }
}