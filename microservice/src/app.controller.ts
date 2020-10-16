import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor() {}

  @EventPattern('some-message')
  async handleMessagePrinted(data: Record<string, unknown>) {
    console.log(data.message);
  }
}
