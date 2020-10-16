import { Message } from "./Message";
import { User } from "./User";

export interface RoomData {
  roomName: string;
  messages: Message[];
  users: User[];
}
