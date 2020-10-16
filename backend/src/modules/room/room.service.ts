import { Injectable } from '@nestjs/common';
import { User } from '../../entities/User.entity';
import { Room } from '../../entities/Room.entity';
import { NewMessage } from './dtos/NewMessage.dto';

const RETURN_FIRST_N_MESSAGES = 50;

@Injectable()
export class RoomService {
  rooms: Record<string, Room> = {};
  users: User[] = [];

  connectUser(connectedUser: User): Room {
    const { roomName, username, socketId } = connectedUser;
    const room = this.getRoom(roomName);
    if (
      !this.users.find(
        user => user.username === 'Admin' && user.roomName === roomName,
      )
    ) {
      this.users.push({ socketId: 'admin', username: 'Admin', roomName });
    }
    if (
      !this.users.find(
        user =>
          user.username === username &&
          user.roomName === roomName &&
          user.socketId === socketId,
      )
    ) {
      this.users.push(connectedUser);
    }

    room.messages.push({
      username: 'Admin',
      message: `Welcome to the room ${username}`,
      createdAt: new Date(),
    });

    return this.makeData(roomName, room);
  }

  disconnectUser(socketId: string): Room {
    const { username, roomName } = this.users.find(
      user => user.socketId === socketId,
    );
    const room = this.getRoom(roomName);
    room.messages.push({
      username: 'Admin',
      message: `User ${username} has left the room.`,
      createdAt: new Date(),
    });

    this.users = this.users.filter(user => user.socketId !== socketId);

    return this.makeData(roomName, room);
  }

  addNewMessage({ message, roomName, username }: NewMessage) {
    const room = this.getRoom(roomName);
    room.messages.push({ createdAt: new Date(), message, username });

    return this.makeData(roomName, room);
  }

  getRoomData(roomName: string): Room {
    return this.getRoom(roomName);
  }

  private getDefaultRoom(roomName: string): Room {
    return {
      roomName,
      messages: [],
      users: [],
    };
  }

  private getRoom(roomName: string): Room {
    if (!this.rooms[roomName])
      this.rooms[roomName] = this.getDefaultRoom(roomName);
    return this.rooms[roomName];
  }

  private makeData(roomName: string, room: Room): Room {
    const usersInRoom = this.users.filter(user => user.roomName === roomName);
    const sortedMessages = room.messages.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
    return {
      ...room,
      messages: sortedMessages.slice(0, RETURN_FIRST_N_MESSAGES).reverse(),
      users: usersInRoom,
    };
  }
}
