import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailContext } from 'src/types';
import { MailerService } from '@nestjs-modules/mailer';

const templatePath =
  process.env.NODE_ENV === 'production'
    ? '/apps/server/template/child-email-template'
    : '/template/child-email-template';

@Injectable()
export class EmailService {
  private emailQueue: Array<{ subject: string; context: EmailContext }> = [];

  constructor(private readonly mailerService: MailerService) {}

  @Cron('*/15 * * * * *')
  async handleCron() {
    while (this.emailQueue.length > 0) {
      const { subject, context } = this.emailQueue.shift();
      await this.mailerService.sendMail({
        to: 'santa@northpole.com',
        subject,
        template: process.cwd() + templatePath,
        context,
      });
    }
  }

  addToQueue(subject: string, context: EmailContext) {
    this.emailQueue.push({ subject, context });
  }
}
