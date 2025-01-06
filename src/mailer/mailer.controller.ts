import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { EmailService } from './providers/mailer.service';
import { ISendMailOptions } from './interfaces/mailer.interface';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: EmailService) {}

  @Post('send-verification')
  async sendVerificationEmail(@Body() body: { email: string; name: string }) {
    const mailOptions: ISendMailOptions = {
      to: body.email || 'ramkaf99@gmail.com',
      subject: 'Verify Your Email',
      html: 'verification.html',
      variables: {
        name: body.name || 'User',
        code: Math.random().toString(36).substring(2, 8).toUpperCase(),
        year: new Date().getFullYear().toString()
      }
    };
    return await this.mailerService.sendEmail(mailOptions);
  }

  @Post('send-welcome')
  async sendWelcomeEmail(@Body() body: { email: string; name: string }) {
    const mailOptions: ISendMailOptions = {
      to: body.email || 'ramkaf99@gmail.com',
      subject: 'Welcome to Our Platform',
      html: 'welcome.html',
      variables: {
        title: 'Welcome to Our Platform',
        name: body.name || 'User',
        year: new Date().getFullYear().toString()
      }
    };
    return await this.mailerService.sendEmail(mailOptions);
  }

  @Post('send-password-reset')
  async sendPasswordResetEmail(@Body() body: { email: string; name: string }) {
    const mailOptions: ISendMailOptions = {
      to: body.email || 'ramkaf99@gmail.com',
      subject: 'Password Reset Request',
      html: 'reset-password.html',
      variables: {
        name: body.name || 'User',
        resetUrl: `https://yourwebsite.com/reset-password?token=${Math.random().toString(36).substring(7)}`,
        year: new Date().getFullYear().toString()
      }
    };
    return await this.mailerService.sendEmail(mailOptions);
  }

  @Post('send-purchase')
  async sendPurchaseEmail(
    @Body() 
    body: { 
      email: string; 
      name: string;
      product: string;
      cartUrl: string;
    }
  ) {
    const mailOptions: ISendMailOptions = {
      to: body.email || 'ramkaf99@gmail.com',
      subject: 'Purchase Confirmation',
      html: 'purchase.html',
      variables: {
        name: body.name || 'User',
        product: body.product || 'Your Product',
        cart: body.cartUrl || 'https://yourwebsite.com/cart'
      }
    };
    return await this.mailerService.sendEmail(mailOptions);
  }

  // Test endpoint to send all types of emails
  @Post('test-all')
  async testAllEmails() {
    try {
      const testEmail = 'ramkaf99@gmail.com';
      const testName = 'Test User';

      // Send verification email
      await this.sendVerificationEmail({ email: testEmail, name: testName });

      // Send welcome email
      await this.sendWelcomeEmail({ email: testEmail, name: testName });

      // Send password reset email
      await this.sendPasswordResetEmail({ email: testEmail, name: testName });

      // Send purchase confirmation
      await this.sendPurchaseEmail({ 
        email: testEmail, 
        name: testName,
        product: 'Test Product',
        cartUrl: 'https://yourwebsite.com/cart'
      });

      return {
        success: true,
        message: 'All test emails sent successfully'
      };
    } catch (error) {
      throw new BadRequestException(`Failed to send test emails: ${error.message}`);
    }
  }
}