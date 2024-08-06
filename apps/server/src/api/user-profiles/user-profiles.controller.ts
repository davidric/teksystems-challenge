import { Controller, Get, Param } from '@nestjs/common';
import { UserProfilesService } from './user-profiles.service';

@Controller('user-profiles')
export class UserProfilesController {
  constructor(private readonly userProfilesService: UserProfilesService) {}

  @Get()
  getAllProfiles() {
    return this.userProfilesService.getAllProfiles();
  }

  @Get(':userUid')
  getProfileByUserUid(@Param('userUid') userUid: string) {
    return this.userProfilesService.getProfileByUserUid(userUid);
  }
}
