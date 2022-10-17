import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/Session/session.entity';
import { SessionService } from 'src/Session/session.service';
import { User } from 'src/User/user.entity';
import { Repository } from 'typeorm';
import { MessageDTO } from './message.DTO';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly sessionService: SessionService,
  ) {}

  async SendMessage(messageInfo: MessageDTO): Promise<Message> {
    const message = new Message(
      messageInfo.message,
      messageInfo.user.id,
      messageInfo.session,
    );
    return this.messageRepository.save(message);
  }
  async GetAllMessagesInSession(user1: User, user2: User): Promise<Message[]> {
    const currentSession = await this.sessionService.findSession(
      user1.id,
      user2.id,
    );
    return this.messageRepository.find({
      where: { session: currentSession },
    });
  }
}
