import { Message } from './Message.entity';
import { User } from './User.entity';

export class Room {
  roomName: string;
  messages: Message[];
  users: User[];
}
