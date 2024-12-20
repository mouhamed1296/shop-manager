import { ConsoleLogger, Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResendEmailService {
  constructor(private configService: ConfigService) {}
  logger = new ConsoleLogger(ResendEmailService.name); //

  async sendEmail(email: string, subject: string, html: string): Promise<any> {
    this.logger.log(this.configService.get<string>('EMAIL_API_KEY'));
    // Récupération de l'objet resend
    const resend = new Resend(this.configService.get<string>('EMAIL_API_KEY'));

    // Envoi du mail et stockage du résultat dans data
    const data = await resend.emails.send({
      to: email,
      from: this.configService.get<string>('EMAIL_FROM'),
      subject: subject,
      html: html,
    });

    this.logger.log(data);
    return data;
  }
}
