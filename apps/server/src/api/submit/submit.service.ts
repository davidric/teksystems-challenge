import { Injectable } from '@nestjs/common';
import { SubmitDto } from './submit.dto';

@Injectable()
export class SubmitService {
  submitData(payload: SubmitDto): string {
    const userName = payload.username;
    return userName;
  }
}
