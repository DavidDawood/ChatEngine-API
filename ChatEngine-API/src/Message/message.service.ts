import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
    const session: Session = await this.sessionService.findSessionByID(
      messageInfo.sessionID,
    );

    console.log(session.users);
    if (!session.users.some((x) => x.id == messageInfo.userID))
      throw new HttpException(
        'User is not in the session',
        HttpStatus.BAD_REQUEST,
      );

    const message = new Message(messageInfo.message, messageInfo.userID);
    message.session = session;
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
  async GetAllMessagesInSessionByID(sessionID: number): Promise<Message[]> {
    return this.messageRepository.find({
      where: { session: { id: sessionID } },
    });
  }
}
