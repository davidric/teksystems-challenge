import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
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
  ];

  getAllUsers() {
    return this.users;
  }

  getUserByUsername(username: string) {
    return this.users.find(user => user.username === username);
  }
}
