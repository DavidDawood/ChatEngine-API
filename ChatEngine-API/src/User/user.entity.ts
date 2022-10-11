import { Session } from 'src/Session/session.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { UserSessionPacket } from './userSessionCollection.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  @OneToMany(
    () => UserSessionPacket,
    (collection) => collection.collectionOwnershipID,
    { cascade: true },
  )
  collection: UserSessionPacket[];

  constructor(username: string) {
    this.username = username;
  }
}
