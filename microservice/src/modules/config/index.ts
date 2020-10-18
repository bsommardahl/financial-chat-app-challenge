import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  rabbitmqPort: process.env.RABBITMQ_PORT,
  rabbitmqHost: process.env.RABBITMQ_HOST,
  rabbitmqHostName: process.env.RABBITMQ_HOST_NAME,
  rabbitmqUser: process.env.RABBITMQ_USER,
  rabbitmqPassword: process.env.RABBITMQ_PASSWORD,
  rabbitmqQueueName: process.env.RABBITMQ_QUEUE_NAME,
  rabbitmqResponseQueueName: process.env.RABBITMQ_RESPONSE_QUEUE_NAME,
}));
