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

  async find(id: number): Promise<User> {
    try {
      const item = await this.usersRepository.findOneOrFail({
        where: { id: id },
      });
      return item;
    } catch {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
  async findByName(name: string): Promise<User> {
    const item = await this.usersRepository.findOneOrFail({
      where: { username: name },
    });

    return item;
  }
  async findAll(): Promise<User[]> {
    const item = await this.usersRepository.find();
    return item;
  }

  async addUser(username: string): Promise<User> {
    try {
      await this.findByName(username);
    } catch {
      return this.usersRepository.save(new User(username));
    }
    throw new HttpException(
      'username Found, login to it instead',
      HttpStatus.BAD_REQUEST,
    );
  }
}
