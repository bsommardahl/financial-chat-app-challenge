import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Room } from './Room.entity';
import { User } from './User.entity';

@Entity({ name: 'messages' })
export class Message extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  message: string;

  @ManyToOne(
    () => User,
    (user: User) => user.messages,
  )
  user: User;

  @ManyToOne(
    () => Room,
    (room: Room) => room.messages,
  )
  room: Room;

  static create(message: string, user: User, room: Room) {
    const entity = new Message();
    entity.message = message;
    entity.room = room;
    entity.user = user;
    return entity;
  }
}
