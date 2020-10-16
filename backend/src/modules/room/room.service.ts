import { Injectable } from '@nestjs/common';
import { User } from '../../entities/User.entity';
import { Room } from '../../entities/Room.entity';

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

    const usersInRoom = this.users.filter(user => user.roomName === roomName);
    return {
      ...room,
      users: usersInRoom,
    };
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

    const usersInRoom = this.users.filter(user => user.roomName === roomName);
    return {
      ...room,
      users: usersInRoom,
    };
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
}
