export interface ISendMailOptions {
  to: string;
  subject: string;
  text?: string; // Plain text content
  html?: string; // Name of the HTML template file
  variables?: Record<string, string>; // Variables to replace in the HTML template
}

export interface PurchaseEmailVariables {
  name: string;      // Required for greeting
  product: string;   // Required for product details
  cart: string;      // Required for cart link URL
}

// Password Reset Email
export interface PasswordResetVariables {
  name: string;      // Required for greeting
  resetUrl: string;  // Required for password reset link
  year: number;      // Required for copyright
}

// Email Verification
export interface VerificationVariables {
  name: string;      // Required for greeting
  code: string;      // Required for verification code
  year: number;      // Required for copyright
}

// Welcome Email
export interface WelcomeVariables {
  title: string;     
  name: string;      
  year: number;    
}


  export enum EmailType {
    PasswordReset = 'PasswordReset', 
    Welcome = 'Welcome',
    Newsletter = 'Newsletter',  
    AccountVerification = 'AccountVerification', 
    Promotional = 'Promotional',   
    FeedbackRequest = 'FeedbackRequest', 
    SubscriptionReminder = 'SubscriptionReminder', 
    SupportTicket = 'SupportTicket',
  }