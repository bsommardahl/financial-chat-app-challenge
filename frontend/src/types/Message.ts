import { User } from "./User";

export interface Message {
  createdAt: Date;
  user: User;
  message: string;
}
