import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserSessionPacket {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  collectionOwnershipID: number;
  @Column()
  sessionID: number;
}
