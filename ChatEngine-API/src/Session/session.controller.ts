import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
} from '@nestjs/common';

import { SessionDTO } from './session.DTO';
import { Session } from './session.entity';
import { SessionService } from './session.service';

@Controller('/session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('')
  async GetAllSessions() {
    return await this.sessionService.getAllSessions();
  }
  @Get(':id')
  async GetSessionByID(@Param('id', ParseIntPipe) id: number) {
    return await this.sessionService.findSessionByID(id);
  }
  @Get('user/:id')
  async GetUsersSessions(@Param('id', ParseIntPipe) id: number) {
    return await this.sessionService.getSessions(id);
  }
  @Post('')
  async CreateSession(@Body() info: SessionDTO): Promise<Session> {
    return await this.sessionService.createSession(info.userID1, info.userID2);
  }
  @Get(':id1/:id2')
  async FindSession(
    @Param('id1', ParseIntPipe) id1: number,
    @Param('id2', ParseIntPipe) id2: number,
  ) {
    return await this.sessionService.findSession(id1, id2);
  }
}
