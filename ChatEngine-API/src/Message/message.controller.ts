import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
} from '@nestjs/common';
import { MessageDTO } from './message.DTO';
import { MessageService } from './message.service';
@Controller('/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post('')
  async SendMessage(@Body() message: MessageDTO) {
    return await this.messageService.SendMessage(message);
  }
}
