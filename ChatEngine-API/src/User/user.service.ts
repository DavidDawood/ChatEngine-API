import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { rejects } from 'assert';
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
    return this.find(userID, true)
      .then((x) => x.identifier == identifier)
      .catch((e) => e);
  }
  async find(id: number, includeIdentifier: boolean): Promise<User> {
    const user = await this.usersRepository.findOneOrFail({
      where: { id: id },
    });
    if (!includeIdentifier) user.identifier = -1;
    return user;
  }

  async findByName(name: string, includeIdentifier: boolean): Promise<User> {
    return await this.usersRepository
      .findOneOrFail({
        where: { username: name },
      })
      .then((x) => {
        if (!includeIdentifier) {
          x.identifier = -1;
          return x;
        }
        return x;
      })
      .catch(() =>
        Promise.reject(
          new HttpException('User not found', HttpStatus.NOT_FOUND),
        ),
      );
  }
  async findAll(): Promise<User[]> {
    const item = await this.usersRepository.find();
    item.map((x) => (x.identifier = -1));
    return item;
  }

  async loginToUser(username: string): Promise<User> {
    const user = await this.findByName(username, true);

    if (user.isActive == 1)
      return Promise.reject(
        new HttpException('User already logged in', HttpStatus.BAD_REQUEST),
      );
    await this.usersRepository.update({ id: user.id }, { isActive: 1 });
    user.isActive = 1;
    return Promise.resolve(user);
  }

  async logoutOfUser(userId: number, identifier: number): Promise<User> {
    const user = await this.find(userId, true).catch((x) => Promise.reject(x));

    if (user.isActive == 0) return Promise.resolve({ id: -1 } as User);
    if (user.identifier != identifier)
      return Promise.resolve({ id: -1 } as User);

    await this.usersRepository.update(
      { id: userId },
      { isActive: 0, identifier: await this.generateNewIdentifier() },
    );

    return Promise.resolve(user);
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
