import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';
import { MessageProvider } from '../../providers/message';
import { MessageModule } from '../message/message.module';
import { RoomModule } from '../room/room.module';
import { SocketModule } from '../socket/socket.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) =>
        configService.TypeOrmDatabase,
    }),
    AppConfigModule,
    RoomModule,
    MessageModule,
    UserModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, MessageProvider],
})
export class AppModule {}
