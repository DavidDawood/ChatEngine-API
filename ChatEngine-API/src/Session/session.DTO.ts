import { IsNumber } from 'class-validator';

export class SessionDTO {
  @IsNumber()
  userID1: number;

  @IsNumber()
  userID2: number;
}
