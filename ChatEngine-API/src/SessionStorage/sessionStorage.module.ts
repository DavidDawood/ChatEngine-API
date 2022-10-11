import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionStorageController } from './sessionStorage.controller';
import { SessionStorage } from './sessionStorage.entity';
import { SessionStorageService } from './sessionStorage.service';

@Module({
  imports: [TypeOrmModule.forFeature([SessionStorage])],
  controllers: [SessionStorageController],
  providers: [SessionStorageService],
})
export class SessionStorageModule {}
