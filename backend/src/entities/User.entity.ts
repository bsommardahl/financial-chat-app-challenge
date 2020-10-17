import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Message } from './Message.entity';
import { Room } from './Room.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 300, nullable: false, unique: true })
  socketId: string;

  @Column({ type: 'varchar', length: 300, nullable: false, unique: true })
  username: string;

  @ManyToMany(
    () => Room,
    (room: Room) => room.users,
  )
  rooms: Room;

  @OneToMany(
    () => Message,
    (message: Message) => message.user,
  )
  messages: Message[];
}
