import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserProfilesService } from '../user-profiles/user-profiles.service';
import { SubmitDto } from './submit.dto';

@Injectable()
export class SubmitService {
  constructor(
    private readonly userService: UsersService,
    private readonly userProfilesService: UserProfilesService,
  ) {}

  validateSubmission({ username, request }: SubmitDto) {
    console.log('requests: ', request);
    const user = this.userService
      .getAllUsers()
      .find(u => u.username === username);

    if (!user) {
      throw new BadRequestException('User not registered');
    }

    const profile = this.userProfilesService
      .getAllProfiles()
      .find(p => p.userUid === user.uid);

    if (!profile) {
      throw new BadRequestException('User profile not found');
    }

    const birthdate = new Date(profile.birthdate);
    const age = this.calculateAge(birthdate);

    if (age > 10) {
      throw new BadRequestException('User is older than 10 years');
    }

    return { message: 'Success' };
  }

  private calculateAge(birthdate: Date): number {
    const today = new Date();
    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDifference = today.getMonth() - birthdate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthdate.getDate())
    ) {
      return age - 1;
    }

    return age;
  }
}
