import { Catch, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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

  async findSession(user1ID: number, user2ID: number): Promise<Session> {
    const queryRunner = this.sessionRepository.createQueryBuilder();

    // have the query runner look for the users, after that, search the users to see if they are linked or not, if not, throw error, if they are, return that session
  }

  async createSession(user1ID: number, user2ID: number): Promise<Session> {
    const foundSession = this.sessionRepository.save();
  }
}
