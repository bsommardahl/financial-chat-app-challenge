import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientOptions, Transport } from '@nestjs/microservices';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'path';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get rabbitmqPort(): string {
    const port = this.configService.get<number>('app.rabbitmqPort');
    return port ? `:${port}` : '';
  }

  get rabbitmqHost(): string {
    return this.configService.get<string>('app.rabbitmqHost');
  }

  get rabbitmqHostName(): string {
    const hostName = this.configService.get<string>('app.rabbitmqHostName');
    return hostName ? `/${hostName}` : '';
  }

  get rabbitmqUser(): string {
    return this.configService.get<string>('app.rabbitmqUser');
  }

  get rabbitmqPassword(): string {
    return this.configService.get<string>('app.rabbitmqPassword');
  }

  get rabbitmqQueueName(): string {
    return this.configService.get<string>('app.rabbitmqQueueName');
  }

  get rabbitmqUserAndPassword(): string {
    let userAndPassword = '';
    if (this.rabbitmqUser && this.rabbitmqPassword) {
      userAndPassword = `${this.rabbitmqUser}:${this.rabbitmqPassword}@`;
    }
    return userAndPassword;
  }

  getRabbitmqOptions(): ClientOptions {
    const url = `amqp://${this.rabbitmqUserAndPassword}${this.rabbitmqHost}${this.rabbitmqPort}${this.rabbitmqHostName}`;

    return {
      transport: Transport.RMQ,
      options: {
        urls: [url],
        queue: this.rabbitmqQueueName,
        queueOptions: {
          durable: false,
        },
      },
    };
  }

  get TypeOrmDatabase(): TypeOrmModuleOptions {
    return {
      type: this.configService.get<any>('db.connection'),
      host: this.configService.get<string>('db.host'),
      port: this.configService.get<number>('db.port'),
      username: this.configService.get<string>('db.user'),
      password: this.configService.get<string>('db.password'),
      database: this.configService.get<string>('db.name'),
      entities: [path.resolve(__dirname, '..', 'entities', '*.entity.js')],
      logging: this.configService.get<string>('db.logging') === 'true',
      extra: { max: 4, min: 1 },
      synchronize: false,
    };
  }
}
