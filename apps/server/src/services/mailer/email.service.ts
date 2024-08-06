import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailContext } from 'src/types';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(
    to: string,
    subject: string,
    template: string,
    context: EmailContext,
  ) {
    await this.mailerService.sendMail({
      to,
      subject,
      template,
      context,
    });
  }
}
