import { Injectable, BadRequestException } from '@nestjs/common';
import { createTransport } from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mailer } from '../entities/mailer.entity';
import { ConfigurationService } from 'src/config/configuration.service';
import * as fs from 'fs/promises';
import * as path from 'path';
import { ISendMailOptions } from '../interfaces/mailer.interface';
import * as handlebars from 'handlebars';

interface TemplateVariables {
  purchase: {
    name: string;
    product: string;
    cart: string;
  };
  'reset-password': {
    name: string;
    resetUrl: string;
    year: number;
  };
  verification: {
    name: string;
    code: string;
    year: number;
  };
  welcome: {
    title: string;
    name: string;
    year: number;
  };
}

@Injectable()
export class EmailService {
  private transporter;
  private defaultFromEmail: string;
  private readonly templateRequirements: Record<string, string[]> = {
    'purchase.html': ['name', 'product', 'cart'],
    'reset-password.html': ['name', 'resetUrl', 'year'],
    'verification.html': ['name', 'code', 'year'],
    'welcome.html': ['title', 'name', 'year']
  };

  constructor(
    @InjectRepository(Mailer)
    private readonly mailRepository: Repository<Mailer>,
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

  private validateTemplateVariables(
    templateName: string, 
    variables: Record<string, string | number>
  ): void {
    const requiredVars = this.templateRequirements[templateName];
    if (!requiredVars) {
      throw new BadRequestException(`Unknown template: ${templateName}`);
    }

    const missing = requiredVars.filter(varName => variables[varName] === undefined);
    if (missing.length > 0) {
      throw new BadRequestException(
        `Missing required variables for ${templateName}: ${missing.join(', ')}`
      );
    }
  }

  private async processHtmlTemplate(
    fileName: string,
    variables: Record<string, string | number>
  ): Promise<string> {
    try {
      this.validateTemplateVariables(fileName, variables);

      const filePath = path.join(__dirname, '../../../public/html', fileName);
      const htmlContent = await fs.readFile(filePath, 'utf-8');
      
      // Convert all variables to strings for template processing
      const stringVariables = Object.entries(variables).reduce((acc, [key, value]) => {
        acc[key] = value.toString();
        return acc;
      }, {} as Record<string, string>);
      
      const template = handlebars.compile(htmlContent);
      return template(stringVariables);
    } catch (error) {
      console.error(`Error processing HTML template ${fileName}:`, error);
      throw error;
    }
  }

  async sendEmail(options: ISendMailOptions): Promise<boolean> {
    try {
      let htmlContent: string | undefined;

      if (options.text) {
        htmlContent = undefined;
      } else if (options.html && options.variables) {
        htmlContent = await this.processHtmlTemplate(options.html, options.variables);
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

  // Helper methods with proper type conversion
  async sendPurchaseConfirmation(to: string, variables: TemplateVariables['purchase']) {
    return this.sendEmail({
      to,
      subject: 'Purchase Confirmation',
      html: 'purchase.html',
      variables: variables as Record<string, string>
    });
  }

  async sendPasswordReset(to: string, variables: TemplateVariables['reset-password']) {
    return this.sendEmail({
      to,
      subject: 'Password Reset Request',
      html: 'reset-password.html',
      variables: {
        ...variables,
        year: variables.year.toString()
      }
    });
  }

  async sendVerificationEmail(to: string, variables: TemplateVariables['verification']) {
    return this.sendEmail({
      to,
      subject: 'Email Verification',
      html: 'verification.html',
      variables: {
        ...variables,
        year: variables.year.toString()
      }
    });
  }

  async sendWelcomeEmail(to: string, variables: TemplateVariables['welcome']) {
    return this.sendEmail({
      to,
      subject: variables.title || 'Welcome!',
      html: 'welcome.html',
      variables: {
        ...variables,
        year: variables.year.toString()
      }
    });
  }
}