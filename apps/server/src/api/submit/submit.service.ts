import { Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UserProfilesService } from '../user-profiles/user-profiles.service';
import { SubmitDto } from './submit.dto';
import { EmailService } from 'src/services/mailer/email.service';
import { EmailContext } from 'src/types';

@Injectable()
export class SubmitService {
  constructor(
    private readonly userService: UsersService,
    private readonly userProfilesService: UserProfilesService,
    private readonly emailService: EmailService,
  ) {}

  validateSubmission({ username, request }: SubmitDto) {
    const user = this.userService.getUserByUsername(username);

    if (!user) {
      throw new BadRequestException('User not registered');
    }

    const profile = this.userProfilesService.getProfileByUserUid(user.uid);

    if (!profile) {
      throw new BadRequestException('User profile not found');
    }

    const birthdate = new Date(profile.birthdate);
    const age = this.calculateAge(birthdate);

    if (age > 10) {
      throw new BadRequestException('User is older than 10 years');
    }

    const context: EmailContext = {
      username,
      address: profile.address,
      request,
    };

    this.emailService.addToQueue("Child's Request", context);

    return {
      title: 'Success',
      message: 'Your request request has been received.',
    };
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
