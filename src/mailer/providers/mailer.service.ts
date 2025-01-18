import { Injectable, BadRequestException } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mailer } from '../entities/mailer.entity';
import { ConfigurationService } from '../../config/configuration.service';
import * as fs from 'fs/promises';
import * as path from 'path';
import {
  ISendMailOptions,
  ITemplateEmailConfigVariables,
} from '../interfaces/mailer.interface';
import * as handlebars from 'handlebars';
import { EmailStatus, EmailType } from '../interfaces/mailer.enum';
import { User } from '../../users/entities/user.entity';
import { IUser } from '../../users/interfaces/user.interface';

@Injectable()
export class EmailService {
  private transporter;
  private defaultFromEmail: string;
  private readonly templateRequirements: Record<string, string[]> = {
    'purchase.html': ['name', 'product', 'cart'],
    'reset-password.html': ['name', 'resetUrl', 'year'],
    'verification.html': ['name', 'code', 'year'],
    'welcome.html': ['title', 'name', 'year'],
  };

  constructor(
    @InjectRepository(Mailer)
    @InjectRepository(Mailer)
    private readonly mailerRepository: Repository<Mailer>,
    private readonly configService: ConfigurationService,
  ) {
    const emailConfig = this.configService.emailConfig;

    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: emailConfig.gmailUser,
        pass: emailConfig.gmailAppPassword,
      },
    });

    this.defaultFromEmail = emailConfig.defaultFromEmail;
  }

  private validateTemplateEmailConfigVariables(
    templateName: string,
    variables: Record<string, string | number>,
  ): void {
    const requiredVars = this.templateRequirements[templateName];
    if (!requiredVars) {
      throw new BadRequestException(`Unknown template: ${templateName}`);
    }

    const missing = requiredVars.filter(
      (varName) => variables[varName] === undefined,
    );
    if (missing.length > 0) {
      throw new BadRequestException(
        `Missing required variables for ${templateName}: ${missing.join(', ')}`,
      );
    }
  }

  private async processHtmlTemplate(
    fileName: string,
    variables: Record<string, string | number>,
  ): Promise<string> {
    try {
      this.validateTemplateEmailConfigVariables(fileName, variables);

      const filePath = path.join(__dirname, '../../../public/html', fileName);
      const htmlContent = await fs.readFile(filePath, 'utf-8');

      // Convert all variables to strings for template processing
      const stringVariables = Object.entries(variables).reduce(
        (acc, [key, value]) => {
          acc[key] = value.toString();
          return acc;
        },
        {} as Record<string, string>,
      );

      const template = handlebars.compile(htmlContent);
      return template(stringVariables);
    } catch (error) {
      console.error(`Error processing HTML template ${fileName}:`, error);
      throw error;
    }
  }

  private async logEmails(
    to: string,
    emailType: EmailType,
    status: EmailStatus,
    errorMessage: null,
  ) {
    const mailSchema = this.mailerRepository.create({
      to,
      status,
      emailType,
      errorMessage,
    });
    await this.mailerRepository.save(mailSchema);
  }

  async sendEmail(options: ISendMailOptions): Promise<boolean> {
    try {
      let htmlContent: string | undefined;

      if (options.text) {
        htmlContent = undefined;
      } else if (options.html && options.variables) {
        htmlContent = await this.processHtmlTemplate(
          options.html,
          options.variables,
        );
      }

      await this.transporter.sendMail({
        from: this.defaultFromEmail,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: htmlContent,
      });

      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      throw error;
    }
  }

  async sendPurchaseConfirmation(user: User) {
    const { email: to } = user;
    try {
      const variables: ITemplateEmailConfigVariables['purchase'] = {
        name: `${user.firstName}`,
        product: '',
        cart: `localhost:${process.env.PORT}/user/cart`,
      };
      const mail = this.sendEmail({
        to,
        subject: 'Purchase Confirmation',
        html: 'purchase.html',
        variables: variables as Record<string, string>,
      });
      await this.logEmails(to, EmailType.Purchase, EmailStatus.success, null);
      return mail;
    } catch (error) {
      await this.logEmails(
        to,
        EmailType.Purchase,
        EmailStatus.error,
        error.message,
      );
    }
  }
  async sendPasswordReset(user: IUser, resetToken: string) {
    const { email: to } = user;
    try {
      const variables: ITemplateEmailConfigVariables['reset-password'] = {
        name: `${user.firstName}`,
        year: new Date().getFullYear(),
        resetUrl: `http://localhost:${process.env.PORT}/auth/password-reset?token=${resetToken}`,
      };

      const mail = await this.sendEmail({
        to,
        subject: 'Password Reset Request',
        html: 'reset-password.html',
        variables: {
          ...variables,
          year: variables.year.toString(),
        },
      });
      await this.logEmails(
        to,
        EmailType.PasswordReset,
        EmailStatus.success,
        null,
      );
      return mail;
    } catch (error) {
      await this.logEmails(
        to,
        EmailType.PasswordReset,
        EmailStatus.error,
        error.message,
      );
      throw error;
    }
  }
  async sendVerificationEmail(user: User, code: string) {
    const { email: to } = user;
    try {
      const variables: ITemplateEmailConfigVariables['verification'] = {
        name: `${user.firstName ? user.firstName : 'dear'}`,
        code,
        year: new Date().getFullYear(),
      };

      const mail = await this.sendEmail({
        to,
        subject: 'Email Verification',
        html: 'verification.html',
        variables: {
          ...variables,
          year: variables.year.toString(),
        },
      });
      this.logEmails(
        to,
        EmailType.AccountVerification,
        EmailStatus.success,
        null,
      );
      return mail;
    } catch (error) {
      await this.logEmails(
        to,
        EmailType.AccountVerification,
        EmailStatus.error,
        error.message,
      );
      throw error;
    }
  }
  async sendWelcomeEmail(user: User) {
    const { email: to } = user;
    const variables: ITemplateEmailConfigVariables['welcome'] = {
      title: 'خوش امدید',
      name: `${user.firstName} ${user.lastName}`,
      year: new Date().getFullYear(),
    };
    try {
      const mail = await this.sendEmail({
        to,
        subject: variables.title || 'Welcome!',
        html: 'welcome.html',
        variables: {
          ...variables,
          year: variables.year.toString(),
        },
      });
      await this.logEmails(to, EmailType.Welcome, EmailStatus.success, null);
      return mail;
    } catch (error) {
      await this.logEmails(
        to,
        EmailType.Welcome,
        EmailStatus.error,
        error.message,
      );
      throw error;
    }
  }
}
