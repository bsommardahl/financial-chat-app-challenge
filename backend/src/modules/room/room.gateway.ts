import { Controller, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CustomLogger } from '../logger/CustomLogger';
import { SocketService } from '../socket/socket.service';
import { ConnectUserDto } from './dtos/connecUser.dto';
import { UserConnected } from './dtos/UserConnected.dto';
import { RoomService } from './room.service';
import { NewMessageRequest } from './dtos/NewMessageRequest.dto';
import { StockCodeRequest } from './dtos/stockCodeRequest.dto';

@WebSocketGateway()
export class RoomGateway implements OnGatewayInit, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  constructor(
    @Inject('MESSAGE_SERVICE') private readonly messageService: ClientProxy,
    private readonly socketService: SocketService,
    private readonly roomService: RoomService,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext('RoomGateway');
  }

  afterInit(server: Server) {
    this.socketService.socket = server;
  }

  async handleDisconnect(client: Socket) {
    this.logger.log(`Client Disconnected ${client.id}`);

    const data = await this.roomService.disconnectUser(client.id);
    const event = 'room-data';

    client.broadcast.to(data.roomName).emit(event, data);
  }

  @SubscribeMessage('hello')
  handleHello(@MessageBody() body: any): WsResponse<string> {
    console.log('Received body', body);
    return { data: 'Hello from NestJS', event: 'answer-hello' };
  }

  @SubscribeMessage('user-connected')
  async handleUserConnected(
    @MessageBody() { roomName, username }: UserConnected,
    @ConnectedSocket() client: Socket,
  ) {
    const connectedUser: ConnectUserDto = {
      roomName,
      username,
      socketId: client.id,
    };
    this.logger.logWithData('User connected', connectedUser);

    client.join(roomName);

    const data = await this.roomService.connectUser(connectedUser);
    const event = 'room-data';

    client.broadcast.to(roomName).emit(event, data);
    return { event, data };
  }

  @SubscribeMessage('new-message')
  async handleNewMessage(
    @MessageBody() newMessagePayload: NewMessageRequest,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    this.logger.logWithData('Message received', newMessagePayload);

    const { message } = newMessagePayload;
    let addStockCodeMessage = false;
    let stockCode = '';
    if (message.startsWith('/stock=')) {
      addStockCodeMessage = true;
      stockCode = message.split('/stock=')[1];

      this.messageService
        .emit<unknown, StockCodeRequest>('stock-code', {
          stockCode,
          roomName: newMessagePayload.roomName,
        })
        .subscribe({
          error: error =>
            this.logger.logWithData('Error sending stock code request', error),
        });
    }

    const data = await this.roomService.addNewMessage(
      { ...newMessagePayload, socketId: client.id },
      addStockCodeMessage,
      stockCode,
    );
    const event = 'room-data';

    this.server.to(data.roomName).emit(event, data);
  }
}
