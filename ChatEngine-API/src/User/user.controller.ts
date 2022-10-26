import {
  Body,
  Controller,
  Get,
  Header,
  Param,
  ParseIntPipe,
  Post,
  Sse,
  UseFilters,
} from '@nestjs/common';
import { Observable, interval, map, Subject, switchMap } from 'rxjs';

import { UserDTO } from './user.DTO';
import { User } from './user.entity';
import { UserFilter } from './user.filter';
import { UsersService } from './user.service';

@Controller('/user')
export class UserController {
  constructor(private readonly service: UsersService) {}

  // for now this will have to do, i unfortanely cannot figure out how to get it to be on click of the findAll with an obserable, ask about this later
  @Sse('userUpdate')
  async userUpdate(): Promise<Observable<MessageEvent>> {
    return interval(5000).pipe(
      await this.findAll().then((x) =>
        map(() => ({ data: x } as MessageEvent)),
      ),
    );
  }

  @Get('')
  async findAll(): Promise<User[]> {
    return await this.service.findAll();
  }
  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.service.find(id, false);
  }
  @Post('/login/:id')
  async login(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.service.loginToUser(id);
  }
  @Post('/logout/:id/:identifier')
  async logout(
    @Param('id', ParseIntPipe) id: number,
    @Param('identifier', ParseIntPipe) identifier: number,
  ): Promise<User> {
    return this.service.logoutOfUser(id, identifier);
  }

  @Post('')
  @UseFilters(new UserFilter())
  async createUser(@Body() login: UserDTO): Promise<User> {
    return await this.service.addUser(login.username);
  }
}
