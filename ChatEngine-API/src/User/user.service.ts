import { Injectable } from '@nestjs/common';
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
    const item = await this.usersRepository.findOneOrFail({
      where: { id: id },
    });

    return item;
  }
}
