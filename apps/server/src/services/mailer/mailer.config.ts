import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailerConfigService implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        // secure: false, // Use true if using SSL/TLS
        auth: {
          user: 'yesenia.johnson34@ethereal.email',
          pass: 'qeXhzMbcutDrbxBR1W',
        },
      },
      defaults: {
        from: '"North Pole" do_not_reply@northpole.com',
      },
      template: {
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    };
  }
}
