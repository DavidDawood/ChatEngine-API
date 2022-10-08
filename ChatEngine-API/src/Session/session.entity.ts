import { SessionStorage } from 'src/SessionStorage/sessionStorage.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user1ID: number;

  @Column()
  user2ID: number;

  @OneToOne((type) => SessionStorage, (sessionStorage) => sessionStorage.id)
  sessionStorageID: number;
}
