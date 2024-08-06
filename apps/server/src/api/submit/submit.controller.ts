import { Body, Controller, Post } from '@nestjs/common';
import { SubmitDto } from './submit.dto';
import { SubmitService } from './submit.service';

@Controller('submit')
export class SubmitController {
  constructor(private readonly submitService: SubmitService) {}

  @Post()
  submit(@Body() payload: SubmitDto) {
    return this.submitService.validateSubmission(payload);
  }
}
