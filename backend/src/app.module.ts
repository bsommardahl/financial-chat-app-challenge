import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  ClientProxyFactory,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';
import { RoomModule } from './modules/room/room.module';

@Module({
  imports: [RoomModule, AppConfigModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'MESSAGE_SERVICE',
      useFactory: (configService: AppConfigService) => {
        const options = configService.getRabbitmqOptions();
        return ClientProxyFactory.create(options);
      },

      inject: [AppConfigService],
    },
  ],
})
export class AppModule {}
