import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { User } from '../../entities/User.entity';
import { RoomRepository } from '../room/room.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), LoggerModule],
  providers: [UserRepository, RoomRepository],
})
export class UserModule {}
