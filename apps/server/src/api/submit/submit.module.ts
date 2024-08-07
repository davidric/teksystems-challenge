import { Module } from '@nestjs/common';
import { SubmitController } from './submit.controller';
import { SubmitService } from './submit.service';
import { UsersService } from '../users/users.service';
import { UserProfilesService } from '../user-profiles/user-profiles.service';
import { EmailService } from 'src/services/email/email.service';

@Module({
  controllers: [SubmitController],
  providers: [SubmitService, UsersService, UserProfilesService, EmailService],
})
export class SubmitModule {}
