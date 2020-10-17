import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Message } from './Message.entity';
import { User } from './User.entity';

@Entity({ name: 'rooms' })
export class Room extends BaseEntity {
  constructor(roomName: string) {
    super();
    this.roomName = roomName;
  }

  @Column({ type: 'varchar', length: 300, nullable: false, unique: true })
  roomName: string;

  @OneToMany(
    () => Message,
    (message: Message) => message.room,
  )
  messages: Message[];

  @ManyToMany(
    () => User,
    (user: User) => user.rooms,
  )
  @JoinTable()
  users: User[];
}
