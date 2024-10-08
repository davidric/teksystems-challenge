import { Test, TestingModule } from '@nestjs/testing';
import { UserProfilesService } from './user-profiles.service';

describe('UserProfilesService', () => {
  let service: UserProfilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserProfilesService],
    }).compile();

    service = module.get<UserProfilesService>(UserProfilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all profiles', () => {
    const profiles = service.getAllProfiles();
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
    const profile = service.getProfileByUserUid(
      '730b0412-72c7-11e9-a923-1681be663d3e',
    );
    expect(profile).toEqual({
      userUid: '730b0412-72c7-11e9-a923-1681be663d3e',
      address: '219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo',
      birthdate: '2017/12/05',
    });
  });

  it('should return undefined if profile not found', () => {
    const profile = service.getProfileByUserUid('non-existent-uid');
    expect(profile).toBeUndefined();
  });
});
