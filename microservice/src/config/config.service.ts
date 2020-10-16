import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get rabbitmqPort(): string {
    return this.configService.get<string>('app.rabbitmqPort');
  }

  get rabbitmqHost(): string {
    return this.configService.get<string>('app.rabbitmqHost');
  }

  get rabbitmqHostName(): string {
    return this.configService.get<string>('app.rabbitmqHostName');
  }

  get rabbitmqUser(): string {
    return this.configService.get<string>('app.rabbitmqUser');
  }

  get rabbitmqPassword(): string {
    return this.configService.get<string>('app.rabbitmqPassword');
  }
}
