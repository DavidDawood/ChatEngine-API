import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async generateNewIdentifier(): Promise<number> {
    return Math.floor(Math.random() * 10000);
  }

  // this isnt in much use atm as each function may or may not grab the function
  async verifyIdentifer(userID: number, identifier: number): Promise<boolean> {
    const result = this.find(userID, true).then(
      (x) => x.identifier == identifier,
    );
    if (!result)
      throw new HttpException('incorrect identifier', HttpStatus.BAD_REQUEST);
    return result;
  }
  async find(id: number, includeIdentifier: boolean): Promise<User> {
    try {
      const user = await this.usersRepository.findOneOrFail({
        where: { id: id },
      });
      if (!includeIdentifier) user.identifier = -1;
      return user;
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async findByName(name: string, includeIdentifier: boolean): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({
      where: { username: name },
    });
    if (!includeIdentifier) user.identifier = -1;
    user.identifier = -1;
    return user;
  }
  async findAll(): Promise<User[]> {
    const item = await this.usersRepository.find();
    item.map((x) => (x.identifier = -1));
    return item;
  }

  async loginToUser(userId: number): Promise<User> {
    const user = await this.find(userId, true);
    if (user.isActive == 1)
      throw new HttpException('User already logged into', HttpStatus.CONFLICT);
    await this.usersRepository.update({ id: userId }, { isActive: 1 });

    return user;
  }

  async logoutOfUser(userId: number, identifier: number): Promise<User> {
    const user = await this.find(userId, true);
    if (user.isActive == 0)
      throw new HttpException('User is not logged into', HttpStatus.CONFLICT);

    if (user.identifier != identifier)
      throw new HttpException(
        'You are not running the current session / incorrect identifier',
        HttpStatus.AMBIGUOUS,
      );
    await this.usersRepository.update(
      { id: userId },
      { isActive: 0, identifier: await this.generateNewIdentifier() },
    );
    return user;
  }

  async addUser(username: string): Promise<User> {
    try {
      await this.findByName(username, false);
    } catch {
      const user = new User(username);
      user.identifier = await this.generateNewIdentifier();
      return this.usersRepository.save(user);
    }
    throw new HttpException(
      'username Found, login to it instead',
      HttpStatus.BAD_REQUEST,
    );
  }
}
