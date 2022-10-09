import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  username: string;
}
