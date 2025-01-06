export interface ISendMailOptions {
  to: string;
  subject: string;
  text?: string; // Plain text content
  html?: string; // Name of the HTML template file
  variables?: Record<string, string>; // Variables to replace in the HTML template
}
export interface ITemplateEmailConfigVariables {
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

export interface IPurchaseEmailVariables {
  name: string;      // Required for greeting
  product: string;   // Required for product details
  cart: string;      // Required for cart link URL
}
export interface IPasswordResetVariables {
  name: string;      // Required for greeting
  resetUrl: string;  // Required for password reset link
  year: number;      // Required for copyright
}
export interface IVerificationVariables {
  name: string;    
  code: string;      
  year: number;      
}
export interface IWelcomeVariables {
  title: string;     
  name: string;      
  year: number;    
}
