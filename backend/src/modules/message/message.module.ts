import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { Message } from '../../entities/Message.entity';
import { MessageRepository } from './message.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Message]), LoggerModule],
  providers: [MessageRepository],
})
export class MessageModule {}
