import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { appConfig, dbConfig } from '.';
import { AppConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, dbConfig],
      validationSchema: Joi.object({
        RABBITMQ_PORT: Joi.number().optional(),
        RABBITMQ_HOST: Joi.string().required(),
        RABBITMQ_HOST_NAME: Joi.string()
          .optional()
          .default(''),
        RABBITMQ_USER: Joi.string().optional(),
        RABBITMQ_PASSWORD: Joi.string().optional(),
        RABBITMQ_QUEUE_NAME: Joi.string().required(),
        TYPEORM_CONNECTION: Joi.string().default('postgres'),
        TYPEORM_ENTITIES: Joi.string().required(),
        TYPEORM_USERNAME: Joi.string().required(),
        TYPEORM_PASSWORD: Joi.string().required(),
        TYPEORM_DATABASE: Joi.string().required(),
        TYPEORM_HOST: Joi.string().required(),
        TYPEORM_PORT: Joi.number()
          .integer()
          .default(5432),
        TYPEORM_LOGGING: Joi.string().default('false'),
        ROOT_DIR: Joi.string()
          .valid('src', 'dist')
          .default('src'),
      }),
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
