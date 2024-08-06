import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { EmailService } from './email.service';
import { EmailContext } from 'src/types';

@Injectable()
export class CronService {
  private emailQueue: Array<{ subject: string; context: EmailContext }> = [];

  constructor(private readonly emailService: EmailService) {}

  @Cron('*/15 * * * * *')
  async handleCron() {
    if (this.emailQueue.length > 0) {
      const { subject, context } = this.emailQueue.shift();
      await this.emailService.sendEmail(
        'davidlikaldo@gmail.com',
        subject,
        process.cwd() + '/template/child-email-template',
        context,
      );
    }
  }

  addToQueue(subject: string, context: EmailContext) {
    this.emailQueue.push({ subject, context });
  }
}
