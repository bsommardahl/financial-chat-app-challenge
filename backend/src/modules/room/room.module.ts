import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppConfigModule } from '../../config/config.module';
import { Room } from '../../entities/Room.entity';
import { MessageProvider } from '../message/message';
import { UserRepository } from '../user/user.repository';
import { RoomController } from './room.controller';
import { RoomGateway } from './room.gateway';
import { RoomRepository } from './room.repository';
import { RoomService } from './room.service';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([Room])],
  controllers: [RoomController],
  providers: [
    RoomService,
    RoomGateway,
    MessageProvider,
    RoomRepository,
    UserRepository,
  ],
})
export class RoomModule {}
