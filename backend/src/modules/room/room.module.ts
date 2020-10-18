import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { AppConfigModule } from '../config/config.module';
import { Room } from '../../entities/Room.entity';
import { MessageProvider } from '../../providers/message';
import { MessageRepository } from '../message/message.repository';
import { SocketService } from '../socket/socket.service';
import { UserRepository } from '../user/user.repository';
import { RoomController } from './room.controller';
import { RoomGateway } from './room.gateway';
import { RoomRepository } from './room.repository';
import { RoomService } from './room.service';

@Module({
  imports: [AppConfigModule, LoggerModule, TypeOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [
    RoomService,
    RoomGateway,
    MessageProvider,
    RoomRepository,
    UserRepository,
    MessageRepository,
    SocketService,
  ],
})
export class RoomModule {}
