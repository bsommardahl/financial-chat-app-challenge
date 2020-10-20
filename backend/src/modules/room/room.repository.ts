import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CommonRepository } from '../../common/common.repository';
import { Room } from '../../entities/Room.entity';
import { CustomLogger } from '../logger/CustomLogger';

@Injectable()
export class RoomRepository extends CommonRepository<Room> {
  constructor(
    @InjectEntityManager() manager: EntityManager,
    private readonly logger: CustomLogger,
  ) {
    super(manager.getRepository(Room));
    this.logger.setContext('RoomRepository');
  }

  async findRoomByName(roomName: string) {
    return this.findOne({ roomName });
  }

  async findByNameOrCreate(roomName: string): Promise<Room> {
    let room = await this.findRoomByName(roomName);
    if (!room) {
      this.logger.log('Room Created');
      room = await this.save(Room.create(roomName));
    }
    return room;
  }
}
