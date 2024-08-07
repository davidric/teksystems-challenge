import { Test, TestingModule } from '@nestjs/testing';
import { SubmitService } from './submit.service';
import { UsersService } from '../users/users.service';
import { UserProfilesService } from '../user-profiles/user-profiles.service';
import { EmailService } from 'src/services/mailer/email.service';
import { BadRequestException } from '@nestjs/common';

describe('SubmitService', () => {
  let service: SubmitService;
  let usersService: UsersService;
  let userProfilesService: UserProfilesService;
  let emailService: EmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubmitService,
        {
          provide: UsersService,
          useValue: {
            getUserByUsername: jest
              .fn()
              .mockImplementation((username: string) => {
                if (username === 'charlie.brown') {
                  return {
                    uid: '730b0412-72c7-11e9-a923-1681be663d3e',
                    username: 'charlie.brown',
                  };
                }
                return null;
              }),
          },
        },
        {
          provide: UserProfilesService,
          useValue: {
            getProfileByUserUid: jest.fn().mockImplementation((uid: string) => {
              if (uid === '730b0412-72c7-11e9-a923-1681be663d3e') {
                return {
                  userUid: uid,
                  address:
                    '219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo',
                  birthdate: '2017/12/05',
                };
              }
              return null;
            }),
          },
        },
        {
          provide: EmailService,
          useValue: {
            addToQueue: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<SubmitService>(SubmitService);
    usersService = module.get<UsersService>(UsersService);
    userProfilesService = module.get<UserProfilesService>(UserProfilesService);
    emailService = module.get<EmailService>(EmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw BadRequestException if user is not registered', () => {
    expect(() => {
      service.validateSubmission({
        username: 'invaliduser',
        request: 'Chocolate',
      });
    }).toThrow(BadRequestException);
  });

  it('should throw BadRequestException if user profile is not found', () => {
    jest.spyOn(usersService, 'getUserByUsername').mockReturnValue({
      username: 'charlie.brown',
      uid: 'non-existent-uid',
    });

    expect(() => {
      service.validateSubmission({
        username: 'charlie.brown',
        request: 'Chocolate',
      });
    }).toThrow(BadRequestException);
  });

  it('should throw BadRequestException if user is older than 10 years', () => {
    jest.spyOn(usersService, 'getUserByUsername').mockReturnValue({
      username: 'james.bond',
      uid: '730b06a6-72c7-11e9-a923-1681be663d3e',
    });

    jest.spyOn(userProfilesService, 'getProfileByUserUid').mockReturnValue({
      userUid: '730b06a6-72c7-11e9-a923-1681be663d3e',
      address: '365-1095, Minowada, Shirataka-machi Nishiokitama-gun, Yamagata',
      birthdate: '1987/01/01',
    });

    expect(() => {
      service.validateSubmission({
        username: 'charlie.brown',
        request: 'Chocolate',
      });
    }).toThrow(BadRequestException);
  });

  it('should call email scheduler if all conditions are met', () => {
    const result = service.validateSubmission({
      username: 'charlie.brown',
      request: 'Chocolate',
    });

    expect(emailService.addToQueue).toHaveBeenCalledWith("Child's Request", {
      username: 'charlie.brown',
      address: '219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo',
      request: 'Chocolate',
    });
    expect(result).toEqual({
      title: 'Success',
      message: 'Your request request has been received.',
    });
  });
});
