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
import { InjectRepository } from '@nestjs/typeorm';
import {
  getConnection,
  getRepository,
  ObjectLiteral,
  Repository,
} from 'typeorm';
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
  async GetAllSessionsFromUser(@Param('id', ParseIntPipe) id: number) {
    return await this.sessionService.getAllSessionsForUser(id);
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
