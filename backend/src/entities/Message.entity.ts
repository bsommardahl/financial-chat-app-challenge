import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Room } from './Room.entity';
import { User } from './User.entity';

@Entity({ name: 'messages' })
export class Message extends BaseEntity {
  @Column({ type: 'text', nullable: false })
  message: string;

  @ManyToOne(
    () => Message,
    (message: Message) => message.user,
  )
  user: User;

  @ManyToOne(
    () => Room,
    (room: Room) => room.messages,
  )
  room: Room;
}
