import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SessionStorage } from './SessionStorage/sessionStorage.entity';
import { User } from './User/user.entity';
import { Session } from './Session/session.entity';
import { UsersModule } from './User/user.module';
import { SessionStorageController } from './SessionStorage/sessionStorage.controller';
import { SessionModule } from './Session/session.module';

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
      entities: [SessionStorage, User, Session],
      synchronize: true,
    }),
    UsersModule,
    SessionStorageController,
    SessionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
