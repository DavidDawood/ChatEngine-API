import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
} from '@nestjs/common';
import { SessionDTO } from './session.DTO';
import { Session } from './session.entity';
import { SessionService } from './session.service';

@Controller('/Session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('')
  async GetAllSessions() {
    return await this.sessionService.getAllSessions();
  }
  @Post('')
  async CreateSession(@Body() info: SessionDTO): Promise<Session> {
    return await this.sessionService.createSession(info.userID1, info.userID2);
  }
}
