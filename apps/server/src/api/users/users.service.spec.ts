import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', () => {
    const users = service.getAllUsers();
    expect(users.length).toBe(3);
    expect(users).toEqual([
      {
        username: 'charlie.brown',
        uid: '730b0412-72c7-11e9-a923-1681be663d3e',
      },
      {
        username: 'james.bond',
        uid: '730b06a6-72c7-11e9-a923-1681be663d3e',
      },
      {
        username: 'bugs.bunny',
        uid: '730b0804-72c7-11e9-a923-1681be663d3e',
      },
    ]);
  });

  it('should return a user by username', () => {
    const user = service.getUserByUsername('charlie.brown');
    expect(user).toEqual({
      username: 'charlie.brown',
      uid: '730b0412-72c7-11e9-a923-1681be663d3e',
    });
  });

  it('should return undefined if user not found', () => {
    const user = service.getUserByUsername('non-existent-username');
    expect(user).toBeUndefined();
  });
});
