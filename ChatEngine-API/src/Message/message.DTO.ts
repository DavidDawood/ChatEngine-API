import { IsString, IsNotEmpty } from 'class-validator';
import { Session } from 'src/Session/session.entity';
import { User } from 'src/User/user.entity';

export class MessageDTO {
  @IsString()
  @IsNotEmpty()
  message: string;
  @IsNotEmpty()
  user: User;
  @IsNotEmpty()
  session: Session;
}
