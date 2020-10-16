import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Room } from '../../entities/Room.entity';
import { NewMessage } from './dtos/NewMessage.dto';
import { UserConnected } from './dtos/UserConnected.dto';
import { UserDisconnected } from './dtos/UserDisconnected.dto';
import { RoomService } from './room.service';

@WebSocketGateway()
export class RoomGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(private readonly roomService: RoomService) {}

  handleDisconnect(client: Socket) {
    console.log('Client Disconnected', client.id);

    const data = this.roomService.disconnectUser(client.id);
    const event = 'room-data';

    this.server.to(data.roomName).emit(event, data);
  }

  @SubscribeMessage('hello')
  handleHello(@MessageBody() body: any): WsResponse<string> {
    console.log('Received body', body);
    return { data: 'Hello from NestJS', event: 'answer-hello' };
  }

  @SubscribeMessage('user-connected')
  handleUserConnected(
    @MessageBody() { roomName, username }: UserConnected,
    @ConnectedSocket() client: Socket,
  ): WsResponse<Room> {
    console.log('User connected', { roomName, username });

    client.join(roomName);

    const data = this.roomService.connectUser({
      socketId: client.id,
      username,
      roomName,
    });
    const event = 'room-data';

    client.broadcast.to(roomName).emit(event, data);
    return { event, data };
  }

  @SubscribeMessage('new-message')
  handleNewMessage(@MessageBody() newMessagePayload: NewMessage): void {
    console.log('Message received', newMessagePayload);

    const { message } = newMessagePayload;
    let addStockCodeMessage = false;
    let stockCode = '';
    if (message.startsWith('/stock=')) {
      addStockCodeMessage = true;
      stockCode = message.split('/stock=')[1];
    }

    const data = this.roomService.addNewMessage(
      newMessagePayload,
      addStockCodeMessage,
      stockCode,
    );
    const event = 'room-data';

    this.server.to(data.roomName).emit(event, data);
  }
}
