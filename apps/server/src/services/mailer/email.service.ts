import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailContext } from 'src/types';
import { MailerService } from '@nestjs-modules/mailer';

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
        template: process.cwd() + '/template/child-email-template',
        context,
      });
    }
  }

  addToQueue(subject: string, context: EmailContext) {
    this.emailQueue.push({ subject, context });
  }
}
