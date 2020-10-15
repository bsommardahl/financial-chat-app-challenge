import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class RoomGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('hello')
  handleHello(@MessageBody() body: any): WsResponse<string> {
    console.log('Received body', body);
    return { data: 'Hello from NestJS', event: 'answer-hello' };
  }
}
