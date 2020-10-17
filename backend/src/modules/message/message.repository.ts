import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CommonRepository } from '../../common/common.repository';
import { Message } from '../../entities/Message.entity';

@Injectable()
export class MessageRepository extends CommonRepository<Message> {
  constructor(@InjectEntityManager() manager: EntityManager) {
    super(manager.getRepository(Message));
  }
}
