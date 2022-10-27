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

@Controller('/user')
export class UserController {
  constructor(private readonly service: UsersService) {}

  // for now this will have to do, i unfortanely cannot figure out how to get it to be on click of the findAll with an obserable, ask about this later, due to event listenr issue, will be removed
  // @Sse('userUpdate')
  // async userUpdate(): Promise<Observable<MessageEvent>> {
  //   return await ConvertMessageEvent(this.service.findAll(), 10000);
  // }

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
    return this.service.loginToUser(username);
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
