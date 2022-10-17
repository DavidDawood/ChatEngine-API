import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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

  async getAllSessions(): Promise<Session[]> {
    return await this.sessionRepository.find();
  }
  async findSession(user1Id: number, user2Id: number): Promise<Session> {
    // check for existing users

    const user1: User = await this.userService.find(user1Id);
    const user2: User = await this.userService.find(user2Id);

    try {
      return await this.sessionRepository.findOneOrFail({
        where: [{ users: user1 } && { users: user2 }],
      });
    } catch {
      throw new HttpException(
        'No session found between users',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async hasSession(user1: User, user2: User): Promise<boolean> {
    const answer = await this.sessionRepository.find({
      where: [{ users: user1 } && { users: user2 }],
    });
    return answer.length == 1;
  }
  async getAllSessionsForUser(userID: number): Promise<Session[]> {
    const user = await this.userService.find(userID);
    return await this.sessionRepository.find({
      where: { users: { id: (await user).id } },
    });
  }

  async createSession(userID1: number, userID2: number): Promise<Session> {
    if (userID1 == userID2)
      throw new HttpException(
        "Cannot create a session for two users with matching id's",
        HttpStatus.BAD_REQUEST,
      );

    const user1 = await this.userService.find(userID1);
    const user2 = await this.userService.find(userID2);
    if (await this.hasSession(user1, user2))
      throw new HttpException(
        'Session already exists, try simply using it',
        HttpStatus.CONFLICT,
      );

    const session = new Session();
    session.users = [user1, user2]; // for some reason typeorm doesnt allow constructors for relationships
    return this.sessionRepository.save(session);
  }
}
