import { Controller, Get, Inject, Query } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('MESSAGE_SERVICE') private readonly client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  @Get()
  getHello(@Query('message') message: string): string {
    this.client.emit<unknown>('some-message', { message });
    return `${message} printed`;
  }
}
