import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { CommonRepository } from '../../common/common.repository';
import { User } from '../../entities/User.entity';
import { Room } from '../../entities/Room.entity';

@Injectable()
export class RoomRepository extends CommonRepository<Room> {
  constructor(@InjectEntityManager() manager: EntityManager) {
    super(manager.getRepository(Room));
  }

  getRoomByName(roomName: string) {
    return this.findOne({ roomName });
  }

  async isUserInRoom(user: User): Promise<boolean> {
    const room = await this.findOne({});
    return true;
  }
}
