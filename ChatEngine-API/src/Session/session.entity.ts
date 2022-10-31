import { User } from 'src/User/user.entity';
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, (user) => user.id)
  @JoinTable()
  users: User[];
}
