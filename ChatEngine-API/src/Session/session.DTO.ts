import { IsNumber } from 'class-validator';

export class SessionDTO {
  @IsNumber()
  myUser: number;
  @IsNumber()
  myUserIdentifier: number;
  @IsNumber()
  userID2: number;
}
