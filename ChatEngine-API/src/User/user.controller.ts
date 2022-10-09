import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
} from '@nestjs/common';

import { UserDTO } from './user.DTO';
import { User } from './user.entity';
import { UserFilter } from './user.filter';
import { UsersService } from './user.service';

@Controller('/User')
export class UserController {
  constructor(private readonly service: UsersService) {}
  @Get('')
  async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }
  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.service.find(id);
  }

  @Post('')
  @UseFilters(new UserFilter())
  async createUser(@Body() login: UserDTO): Promise<User> {
    return await this.service.addUser(login.username);
  }
}
