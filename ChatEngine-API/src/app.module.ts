import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SessionStorage } from './SessionStorage/sessionStorage.entity';
import { User } from './User/user.entity';
import { Session } from './Session/session.entity';
import { UsersModule } from './User/user.module';
import { SessionModule } from './Session/session.module';
import { SessionStorageModule } from './SessionStorage/sessionStorage.module';
import { UserSessionCollection } from './User/userSessionCollection.entity';

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
      entities: [SessionStorage, User, Session, UserSessionCollection],
      synchronize: true,
    }),
    UsersModule,
    SessionStorageModule,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
