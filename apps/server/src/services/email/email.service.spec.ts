import { Test, TestingModule } from '@nestjs/testing';
import { EmailService } from './email.service';
import { MailerService } from '@nestjs-modules/mailer';
import { EmailContext } from 'src/types';

describe('EmailService', () => {
  let service: EmailService;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<EmailService>(EmailService);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add email to the queue', () => {
    const subject = "Child's Request";
    const context: EmailContext = {
      username: 'charlie.brown',
      address: '219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo',
      request: 'Candy',
    };
    service.addToQueue(subject, context);
    expect(service['emailQueue'].length).toBe(1);
    expect(service['emailQueue'][0]).toEqual({ subject, context });
  });

  it('should process emails from the queue and send them', async () => {
    const subject = "Child's Request";
    const context: EmailContext = {
      username: 'testuser',
      address: 'test address',
      request: 'test request',
    };
    service.addToQueue(subject, context);

    await service.handleCron();

    expect(mailerService.sendMail).toHaveBeenCalledWith({
      to: 'santa@northpole.com',
      subject,
      template: process.cwd() + '/template/child-email-template',
      context,
    });
    expect(service['emailQueue'].length).toBe(0);
  });

  it('should handle multiple emails in the queue', async () => {
    const emails = [
      {
        subject: "Child's Request",
        context: {
          username: 'user1',
          address: 'Address 1',
          request: 'Request 1',
        },
      },
      {
        subject: "Child's Request",
        context: {
          username: 'user2',
          address: 'Addres 2',
          request: 'Request 2',
        },
      },
    ];

    emails.forEach(email => service.addToQueue(email.subject, email.context));

    await service.handleCron();

    expect(mailerService.sendMail).toHaveBeenCalledTimes(2);
    expect(service['emailQueue'].length).toBe(0);
  });
});
