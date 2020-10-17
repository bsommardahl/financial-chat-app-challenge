import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  rabbitmqPort: process.env.RABBITMQ_PORT,
  rabbitmqHost: process.env.RABBITMQ_HOST,
  rabbitmqHostName: process.env.RABBITMQ_HOST_NAME,
  rabbitmqUser: process.env.RABBITMQ_USER,
  rabbitmqPassword: process.env.RABBITMQ_PASSWORD,
  rabbitmqQueueName: process.env.RABBITMQ_QUEUE_NAME,
}));

export const dbConfig = registerAs('db', () => ({
  connection: process.env.TYPEORM_CONNECTION,
  user: process.env.TYPEORM_USERNAME,
  entities: process.env.TYPEORM_ENTITIES,
  password: process.env.TYPEORM_PASSWORD,
  name: process.env.TYPEORM_DATABASE,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  logging: process.env.TYPEORM_LOGGING,
  rootDir: process.env.ROOT_DIR,
}));
