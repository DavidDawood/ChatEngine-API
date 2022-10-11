import { SessionStorage } from 'src/SessionStorage/sessionStorage.entity';
import { User } from 'src/User/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @OneToOne(() => User, (user) => user.collection, { cascade: true })
  user1ID: number;

  @Column()
  @OneToOne(() => User, (user) => user.collection, { cascade: true })
  user2ID: number;

  @OneToOne(() => SessionStorage, (sessionStorage) => sessionStorage.id, {
    cascade: true,
  })
  sessionStorage: SessionStorage;

  constructor(userID1: number, userID2: number) {
    this.user1ID = userID1;
    this.user2ID = userID2;
  }
}
