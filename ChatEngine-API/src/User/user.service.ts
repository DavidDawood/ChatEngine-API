import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  generateNewIdentifier(): number {
    return Math.floor(Math.random() * 10000);
  }

  // this isnt in much use atm as each function may or may not grab the function
  async verifyIdentifer(userID: number, identifier: number): Promise<boolean> {
    return this.find(userID, true).then((x) => x.identifier == identifier);
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
    try {
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
        });
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  async findAll(): Promise<User[]> {
    const item = await this.usersRepository.find();
    item.map((x) => (x.identifier = -1));
    return item;
  }

  async loginToUser(username: string): Promise<User> {
    const user = await this.findByName(username, true).catch(() => {
      const newUser = new User(username);
      newUser.identifier = this.generateNewIdentifier();
      newUser.isActive = 1;
      this.usersRepository.create({ username: username });
      return Promise.resolve(newUser);
    });

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
}
