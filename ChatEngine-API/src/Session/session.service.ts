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
  async findSession(
    myUserId: number,
    myUserIdentifier: number,
    user2Id: number,
  ): Promise<Session> {
    const user1: User = await this.userService.find(myUserId, true);

    if (myUserId == user2Id)
      throw new HttpException(
        'both user IDs cant be the same',
        HttpStatus.BAD_REQUEST,
      );
    if (user1.identifier != myUserIdentifier)
      throw new HttpException('identifier incorrect', HttpStatus.BAD_REQUEST);

    const result = await this.sessionRepository.find({
      relations: { users: true },
      where: { users: [{ id: myUserId }, { id: user2Id }] },
    });
    result.map((x) => x.users.map((x) => (x.identifier = -1)));
    if (result[0].users.length > 1) return result[0];
    if (result[1].users.length > 1) return result[1];

    return await this.createSession(myUserId, myUserIdentifier, user2Id);
  }

  async findSessionByID(sessionID: number): Promise<Session> {
    return await this.sessionRepository.findOneOrFail({
      where: { id: sessionID },
      relations: { users: true },
      select: {
        users: { username: true, id: true },
      },
    });
  }

  async getSessions(
    userID: number,
    identification: number,
  ): Promise<Session[]> {
    // this is quite inefficient but it will have to do for now, have it find all sessions related to the usersID, then find all sessions from that user so we can get all related users to that userID's aswell,should save on API calls by doing it here than having users call more than one API
    const user = await this.userService.find(userID, true);
    if (user.identifier != identification)
      throw new HttpException('incorrect identifier', HttpStatus.BAD_REQUEST);

    const sessionIDs = await this.sessionRepository.find({
      relations: { users: true },
      where: { users: { id: (await user).id } },
      select: { id: true },
    });

    return Promise.all(
      await sessionIDs.map(async (x) => await this.findSessionByID(x.id)),
    );
  }

  async createSession(
    userID1: number,
    myUserIdentifier: number,
    userID2: number,
  ): Promise<Session> {
    if (userID1 == userID2)
      throw new HttpException(
        "Cannot create a session for two users with matching id's",
        HttpStatus.BAD_REQUEST,
      );

    const user1 = await this.userService.find(userID1, true);
    const user2 = await this.userService.find(userID2, false);

    if (user1.identifier != myUserIdentifier)
      throw new HttpException('Incorrect Identifier', HttpStatus.BAD_REQUEST);

    const foundSession = await this.findSession(
      user1.id,
      myUserIdentifier,
      user2.id,
    );
    if (foundSession)
      throw new HttpException('session already exists', HttpStatus.BAD_REQUEST);

    const session = new Session();
    session.users = [user1, user2]; // for some reason typeorm doesnt allow constructors for relationships
    return this.sessionRepository.save(session);
  }
}
