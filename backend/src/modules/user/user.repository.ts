import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { CommonRepository } from '../../common/common.repository';
import { User } from '../../entities/User.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class UserRepository extends CommonRepository<User> {
  constructor(@InjectEntityManager() manager: EntityManager) {
    super(manager.getRepository(User));
  }

  getAdminUser() {
    this.findOneOrFail({ username: 'admin' });
  }
}
