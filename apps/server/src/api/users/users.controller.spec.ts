import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            getAllUsers: jest.fn().mockReturnValue([
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
            ]),
            getUserByUsername: jest
              .fn()
              .mockImplementation((username: string) => {
                return {
                  username,
                  uid: '730b06a6-72c7-11e9-a923-1681be663d3e',
                };
              }),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all users', () => {
    const users = controller.getAllUsers();
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
    const username = 'james.bond';
    const user = controller.getUserByUsername(username);
    expect(user).toEqual({
      username: 'james.bond',
      uid: '730b06a6-72c7-11e9-a923-1681be663d3e',
    });
  });
});
