import { Injectable } from '@nestjs/common';
import { User } from '../../entities/User.entity';
import { Room } from '../../entities/Room.entity';
import { NewMessage } from './dtos/NewMessage.dto';
import { ConnectUserDto } from './dtos/connecUser.dto';
import { RoomRepository } from './room.repository';
import { UserRepository } from '../user/user.repository';
import { Message } from '../../entities/Message.entity';
import { MessageRepository } from '../message/message.repository';
import { CustomLogger } from '../logger/CustomLogger';

export const RETURN_FIRST_N_MESSAGES = 50;

@Injectable()
export class RoomService {
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly userRepository: UserRepository,
    private readonly messageRepository: MessageRepository,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext('RoomService');
  }

  async connectUser(connectedUser: ConnectUserDto): Promise<Room> {
    const { roomName, username, socketId } = connectedUser;
    const room = await this.roomRepository.findByNameOrCreate(roomName);

    const adminUser = await this.userRepository.getOrCreateAdminUser(room);
    await this.userRepository.save(User.create(username, socketId, room));

    await this.messageRepository.save(
      Message.create(`Welcome to the room ${username}`, adminUser, room),
    );

    return await this.makeData(room.roomName);
  }

  async disconnectUser(socketId: string): Promise<Room> {
    const user = await this.userRepository.findOneOrFail({
      where: { socketId },
      relations: ['room'],
    });
    const { username, room } = user;
    const adminUser = await this.userRepository.getOrCreateAdminUser(room);
    user.isOnline = false;
    await this.userRepository.save(user);
    this.logger.log('User removed');
    await this.messageRepository.save(
      Message.create(`User ${username} has left the room.`, adminUser, room),
    );

    return await this.makeData(room.roomName);
  }

  async addNewMessage(
    { message, roomName, username, socketId }: NewMessage,
    addStockMessage = false,
    stockCode = '',
  ): Promise<Room> {
    const room = await this.roomRepository.findRoomByName(roomName);
    const adminUser = await this.userRepository.getOrCreateAdminUser(room);
    const messagesToCreate: Message[] = [];

    if (addStockMessage) {
      messagesToCreate.push(
        Message.create(`Handling stock code: '${stockCode}'`, adminUser, room),
      );
    }
    const user = await this.userRepository.findByUsernameOrCreate(
      username,
      socketId,
      room,
    );
    messagesToCreate.push(Message.create(message, user, room));

    await this.messageRepository.saveMany(messagesToCreate);
    this.logger.log('Messages created');

    return await this.makeData(roomName);
  }

  public async makeData(
    roomName: string,
    messageCount = RETURN_FIRST_N_MESSAGES,
  ): Promise<Room> {
    const room = await this.roomRepository.findRoomByName(roomName);
    const sortedMessages = room.messages.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
    return {
      ...room,
      users: room.users.filter(user => user.isOnline),
      messages: sortedMessages.slice(0, messageCount).reverse(),
    };
  }
}
