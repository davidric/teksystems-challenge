import { IsNotEmpty, IsString } from 'class-validator';

export class SubmitDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  request: string;
}
