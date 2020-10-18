import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Message } from 'src/entities/Message.entity';
import { Room } from 'src/entities/Room.entity';
import { User } from 'src/entities/User.entity';
import { CustomLogger } from '../logger/CustomLogger';
import { SocketService } from '../socket/socket.service';
import { RoomService, RETURN_FIRST_N_MESSAGES } from './room.service';

@Controller('room')
export class RoomController {
  constructor(
    private readonly socketService: SocketService,
    private readonly roomService: RoomService,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext('RoomController');
  }

  @EventPattern('some-message-response')
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log('data backend', data);
  }

  @EventPattern('stock-message')
  async handleStockMessage(data: Record<string, string>) {
    this.logger.logWithData('Stock Message response', data);
    const roomData = await this.roomService.makeData(
      data.roomName,
      RETURN_FIRST_N_MESSAGES - 1,
    );
    const now = new Date();

    const user = new User();
    user.id = -1;
    user.createdAt = now;
    user.updatedAt = now;
    user.isOnline = false;
    user.room = Room.create(data.roomName);
    user.socketId = 'STOCKBOT';
    user.username = 'StockBot';

    const message = new Message();
    message.id = -1;
    message.createdAt = now;
    message.updatedAt = now;
    message.message = data.message;
    message.user = user;

    roomData.messages.push(message);

    const event = 'room-data';
    this.socketService.socket.to(data.roomName).emit(event, roomData);
  }
}
