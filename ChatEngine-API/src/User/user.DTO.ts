import { IsString, Max, Min } from 'class-validator';

// do a DTO here
export class UserDTO {
  @IsString()
  @Min(3)
  @Max(20)
  username: string;
}
