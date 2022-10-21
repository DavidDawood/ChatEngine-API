import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/Session/session.entity';
import { SessionService } from 'src/Session/session.service';
import { User } from 'src/User/user.entity';
import { UsersService } from 'src/User/user.service';
import { Repository } from 'typeorm';
import { MessageDTO } from './message.DTO';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly sessionService: SessionService,
    private readonly userService: UsersService,
  ) {}

  async SendMessage(messageInfo: MessageDTO): Promise<Message> {
    const session: Session = await this.sessionService.findSessionByID(
      messageInfo.sessionID,
    );

    if (!session.users.some((x) => x.id == messageInfo.userID))
      throw new HttpException(
        'User is not in the session',
        HttpStatus.BAD_REQUEST,
      );
    const sqlUser = await this.userService.find(messageInfo.userID, true);
    if (sqlUser.identifier != messageInfo.identifier)
      throw new HttpException(
        'Identifier incorrect, recieve it via login',
        HttpStatus.BAD_REQUEST,
      );

    const message = new Message(messageInfo.message, messageInfo.userID);
    message.session = session;
    const savedMessage = await this.messageRepository.save(message);
    savedMessage.session.users.map((x) => (x.identifier = -1));
    return savedMessage;
  }
  async GetAllMessagesInSession(
    myUser: User,
    identifier: number,
    targetUser: User,
  ): Promise<Message[]> {
    const sqlUser = await this.userService.find(myUser.id, true);
    if (sqlUser.identifier != identifier)
      throw new HttpException(
        'Identifier incorrect, recieve it via login',
        HttpStatus.BAD_REQUEST,
      );
    const currentSession = await this.sessionService.findSession(
      myUser.id,
      identifier,
      targetUser.id,
    );
    return this.messageRepository.find({
      where: { session: { id: currentSession.id } },
    });
  }
}
