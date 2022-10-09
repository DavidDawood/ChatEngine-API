import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionStorage } from './sessionStorage.entity';

@Injectable()
export class SessionStorageService {
  constructor(
    @InjectRepository(SessionStorage)
    private readonly sessionStorageRepository: Repository<SessionStorage>,
  ) {}
}
