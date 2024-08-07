import { Test, TestingModule } from '@nestjs/testing';
import { UserProfilesController } from './user-profiles.controller';
import { UserProfilesService } from './user-profiles.service';

describe('UserProfilesController', () => {
  let controller: UserProfilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProfilesController],
      providers: [
        {
          provide: UserProfilesService,
          useValue: {
            getAllProfiles: jest.fn().mockReturnValue([
              {
                userUid: '730b0412-72c7-11e9-a923-1681be663d3e',
                address: '219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo',
                birthdate: '2017/12/05',
              },
              {
                userUid: '730b06a6-72c7-11e9-a923-1681be663d3e',
                address:
                  '365-1095, Minowada, Shirataka-machi Nishiokitama-gun, Yamagata',
                birthdate: '1987/01/01',
              },
              {
                userUid: '730b0804-72c7-11e9-a923-1681be663d3e',
                address: '292-1082, Yodacho, Obihiro-shi, Hokkaido',
                birthdate: '2010/23/01',
              },
            ]),
            getProfileByUserUid: jest
              .fn()
              .mockImplementation((userUid: string) => {
                return {
                  userUid,
                  address:
                    '219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo',
                  birthdate: '2017/12/05',
                };
              }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserProfilesController>(UserProfilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all profiles', () => {
    const profiles = controller.getAllProfiles();
    expect(profiles.length).toBe(3);
    expect(profiles).toEqual([
      {
        userUid: '730b0412-72c7-11e9-a923-1681be663d3e',
        address: '219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo',
        birthdate: '2017/12/05',
      },
      {
        userUid: '730b06a6-72c7-11e9-a923-1681be663d3e',
        address:
          '365-1095, Minowada, Shirataka-machi Nishiokitama-gun, Yamagata',
        birthdate: '1987/01/01',
      },
      {
        userUid: '730b0804-72c7-11e9-a923-1681be663d3e',
        address: '292-1082, Yodacho, Obihiro-shi, Hokkaido',
        birthdate: '2010/23/01',
      },
    ]);
  });

  it('should return a profile by userUid', () => {
    const userUid = '730b0412-72c7-11e9-a923-1681be663d3e';
    const profile = controller.getProfileByUserUid(userUid);
    expect(profile).toEqual({
      userUid,
      address: '219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo',
      birthdate: '2017/12/05',
    });
  });
});
