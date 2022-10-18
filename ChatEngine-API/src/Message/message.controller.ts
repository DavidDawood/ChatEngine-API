import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from 'src/User/user.service';
import { MessageDTO } from './message.DTO';
import { MessageService } from './message.service';
@Controller('/message')
export class MessageController {
  constructor(
    private readonly messageService: MessageService,
    private readonly userService: UsersService,
  ) {}
  @Post('')
  async SendMessage(@Body() message: MessageDTO) {
    return await this.messageService.SendMessage(message);
  }
  @Get(':id1/:id2')
  async getAllMessages(
    @Param('id1', ParseIntPipe) id1: number,
    @Param('id2', ParseIntPipe) id2: number,
  ) {
    const user1 = this.userService.find(id1);
    const user2 = this.userService.find(id2);

    return await Promise.all([user1, user2]).then((x) =>
      this.messageService.GetAllMessagesInSession(x[0], x[1]),
    );
  }
  @Get(':id')
  async getAllMessagesForSessionID(@Param('id', ParseIntPipe) id: number) {
    return await this.messageService.GetAllMessagesInSessionByID(id);
  }
}
