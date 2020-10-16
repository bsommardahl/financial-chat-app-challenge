import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { appConfig } from '.';
import { AppConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
      validationSchema: Joi.object({
        RABBITMQ_PORT: Joi.number().optional(),
        RABBITMQ_HOST: Joi.string().required(),
        RABBITMQ_HOST_NAME: Joi.string()
          .optional()
          .default(''),
        RABBITMQ_USER: Joi.string().optional(),
        RABBITMQ_PASSWORD: Joi.string().optional(),
        RABBITMQ_QUEUE_NAME: Joi.string().required(),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
