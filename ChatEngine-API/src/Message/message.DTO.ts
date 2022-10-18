import { IsString, IsNotEmpty } from 'class-validator';
import { Session } from 'src/Session/session.entity';
import { User } from 'src/User/user.entity';

export class MessageDTO {
  @IsString()
  @IsNotEmpty()
  message: string;
  @IsNotEmpty()
  userID: number;
  @IsNotEmpty()
  sessionID: number;
}
