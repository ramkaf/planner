export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface EmailConfig {
  gmailUser: string;
  gmailAppPassword: string;
  defaultFromEmail: string;
}

export interface Config {
  database: DatabaseConfig;
  email: EmailConfig;
}
