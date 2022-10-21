import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class MessageDTO {
  @IsString()
  @IsNotEmpty()
  message: string;
  @IsNotEmpty()
  userID: number;
  @IsNotEmpty()
  @IsNumber()
  identifier: number;
  @IsNotEmpty()
  sessionID: number;
}
