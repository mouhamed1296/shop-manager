export interface EmailService {
  sendEmail(email: string, subject: string, html: string): any;
}
