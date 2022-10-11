import {
  Catch,
  HttpException,
  HttpStatus,
  Injectable,
  UseFilters,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/User/user.entity';

import { UsersService } from 'src/User/user.service';
import { Repository } from 'typeorm';
import { Session } from './session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    private readonly userService: UsersService,
  ) {}

  async findSession(user1Id: number, user2Id: number): Promise<Session> {
    // check for existing users

    const user1: User = await this.userService.find(user1Id);
    const user2: User = await this.userService.find(user2Id);

    try {
      const session = user1.sessions.find((r) => user2.sessions.includes(r));
      return this.sessionRepository.findOneOrFail({
        where: { id: session?.id },
      });
    } catch {
      throw new HttpException(
        'Session not found between users',
        HttpStatus.NOT_FOUND,
      );
    }
  }
  async hasSession(user1Id: number, user2Id: number): Promise<boolean> {
    const user1: User = await this.userService.find(user1Id);
    const user2: User = await this.userService.find(user2Id);

    console.log(user1, user2.collection);
    if (!user1.collection || !user2.collection) return false;

    const test = user1.collection.some((x) => user2.collection.includes(x));
    return test;
  }
  async getAllSessions(): Promise<Session[]> {
    return await this.sessionRepository.find();
  }

  async createSession(user1ID: number, user2ID: number): Promise<Session> {
    if (await this.hasSession(user1ID, user2ID))
      throw new HttpException(
        'Session already exists, try simply using it',
        HttpStatus.CONFLICT,
      );

    return this.sessionRepository.save(new Session(user1ID, user2ID));
  }
}
