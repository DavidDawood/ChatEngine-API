import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { UserDTO } from './user.DTO';
import { User } from './user.entity';
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
  async createUser(@Body() info: UserDTO) {
    this.service.addUser(info.username);
  }
}
