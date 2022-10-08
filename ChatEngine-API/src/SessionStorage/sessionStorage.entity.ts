import { IsDate, IsNumber, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SessionStorage {
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
}
