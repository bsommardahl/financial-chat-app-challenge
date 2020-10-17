import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Message } from './Message.entity';
import { User } from './User.entity';

@Entity({ name: 'rooms' })
export class Room extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false, unique: true })
  roomName: string;

  @OneToMany(
    () => Message,
    (message: Message) => message.room,
    { eager: true },
  )
  messages: Message[];

  @OneToMany(
    () => User,
    (user: User) => user.room,
    { eager: true },
  )
  users: User[];

  static create(roomName: string) {
    const room = new Room();
    room.roomName = roomName;
    room.messages = [];
    room.users = [];
    return room;
  }
}
