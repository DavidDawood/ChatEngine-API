import { Body, Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { Session } from './session.entity';
import { SessionService } from './session.service';

@Controller('/session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('')
  async GetAllSessions(): Promise<Session[]> {
    return await this.sessionService.getAllSessions();
  }
  @Get('user/:id/:identification')
  async GetUsersSessions(
    @Param('id', ParseIntPipe) id: number,
    @Param('identification', ParseIntPipe) identification: number,
  ) {
    return await this.sessionService.getSessions(id, identification);
  }

  @Get(':id1/:identifier/:id2')
  async FindSession(
    @Param('id1', ParseIntPipe) id1: number,
    @Param('identifier', ParseIntPipe) identifier: number,
    @Param('id2', ParseIntPipe) id2: number,
  ) {
    return await this.sessionService.findSession(id1, identifier, id2);
  }
}
