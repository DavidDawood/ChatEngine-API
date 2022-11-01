import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly service: UsersService) {}

  @Get('')
  async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }
  @Get(':name')
  async findByName(@Param('name') name: string): Promise<User> {
    return await this.service.findByName(name, false);
  }
  @Post('/login/:username')
  async login(@Param('username') username: string): Promise<User> {
    return await this.service.loginToUser(username);
  }
  @Post('/logout/:id/:identifier')
  async logout(
    @Param('id', ParseIntPipe) id: number,
    @Param('identifier', ParseIntPipe) identifier: number,
  ): Promise<User> {
    return this.service.logoutOfUser(id, identifier);
  }
}
