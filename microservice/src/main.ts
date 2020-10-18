import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './modules/app/app.module';
import { CustomLogger } from './modules/logger/CustomLogger';

const getMicroserviceOptions = (): MicroserviceOptions => {
  let userAndPassword = '';
  if (process.env.RABBITMQ_USER && process.env.RABBITMQ_PASSWORD) {
    userAndPassword = `${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@`;
  }
  const hostName = process.env.RABBITMQ_HOST_NAME
    ? `/${process.env.RABBITMQ_HOST_NAME}`
    : '';
  const port = process.env.RABBITMQ_PORT ? `:${process.env.RABBITMQ_PORT}` : '';
  const url = `amqp://${userAndPassword}${process.env.RABBITMQ_HOST}${port}${hostName}`;

  return {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue: process.env.RABBITMQ_QUEUE_NAME,
      queueOptions: {
        durable: false,
      },
    },
  };
};

async function bootstrap() {
  const options: MicroserviceOptions = getMicroserviceOptions();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    options,
  );
  const logger = new CustomLogger();
  app.useLogger(logger);
  await app.listen(() => logger.log('Microservice is listening', 'Main'));
}
bootstrap();
