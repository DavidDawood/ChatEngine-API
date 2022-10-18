import { IsDate, IsNumber, IsString } from 'class-validator';
import { Session } from 'src/Session/session.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  message: string;

  @Column()
  @IsNumber()
  sentByID: number;

  @Column()
  @IsDate()
  timeSent: Date;

  @ManyToOne(() => Session, (session) => session.id)
  session: Session;

  constructor(messageText: string, sentByID: number) {
    this.message = messageText;
    this.sentByID = sentByID;
    this.timeSent = new Date();
  }
}
