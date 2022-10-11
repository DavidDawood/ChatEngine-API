import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UsersService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UserController],
  exports: [UsersService],
  // exporting is a must due to sessionServices using userServices
})
export class UsersModule {}
