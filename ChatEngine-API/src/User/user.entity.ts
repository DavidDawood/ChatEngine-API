import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { UsersService } from './user.service';

@Entity()
export class User {
  private readonly userService: UsersService;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  isActive: number;

  @Column()
  username: string;

  @Column()
  identifier: number;

  constructor(username: string) {
    this.username = username;
    this.isActive = 0;
  }
}
