import { Session } from 'src/Session/session.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany((type) => Session, (session) => session.id)
  sessionID: Session[];

  constructor(username: string) {
    this.username = username;
  }
}
