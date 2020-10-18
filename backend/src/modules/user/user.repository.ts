import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CommonRepository } from '../../common/common.repository';
import { User } from '../../entities/User.entity';
import { EntityManager } from 'typeorm';
import { Room } from '../../entities/Room.entity';
import { CustomLogger } from '../logger/CustomLogger';

@Injectable()
export class UserRepository extends CommonRepository<User> {
  constructor(
    @InjectEntityManager() manager: EntityManager,
    private readonly logger: CustomLogger,
  ) {
    super(manager.getRepository(User));
    this.logger.setContext('UserRepository');
  }

  async getOrCreateAdminUser(room: Room): Promise<User> {
    let adminUser = await this.findOne({ username: 'admin', room });
    if (!adminUser) {
      adminUser = await this.save(
        User.create('admin', `admin-${room.roomName}`, room),
      );
      this.logger.log('Admin created');
    }
    return adminUser;
  }

  async findByUsernameOrCreate(
    username: string,
    socketId: string,
    room: Room,
  ): Promise<User> {
    let user = await this.findOne({ username, socketId });
    if (!user) {
      this.logger.log('User created');
      user = await this.save(User.create(username, socketId, room));
    }
    return user;
  }
}
