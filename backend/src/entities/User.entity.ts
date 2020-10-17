import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Message } from './Message.entity';
import { Room } from './Room.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false, unique: true })
  socketId: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  username: string;

  @ManyToOne(
    () => Room,
    (room: Room) => room.users,
  )
  room: Room;

  @OneToMany(
    () => Message,
    (message: Message) => message.user,
  )
  messages: Message[];

  static create(username: string, socketId: string, room: Room) {
    const user = new User();
    user.username = username;
    user.socketId = socketId;
    user.room = room;
    user.messages = [];
    return user;
  }
}
