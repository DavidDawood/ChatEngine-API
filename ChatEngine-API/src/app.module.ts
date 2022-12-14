import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './User/user.entity';
import { Session } from './Session/session.entity';
import { UsersModule } from './User/user.module';
import { SessionModule } from './Session/session.module';
import { MessageModule } from './Message/message.module';
import { Message } from './Message/message.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localHost',
      port: 3306,
      username: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [Message, User, Session],
      synchronize: true,
    }),
    UsersModule,
    MessageModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
