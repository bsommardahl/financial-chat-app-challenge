import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from './config/config.module';
import { RoomModule } from './modules/room/room.module';
import { MessageProvider } from './modules/message/message';
import { AppConfigService } from './config/config.service';
import { MessageModule } from './modules/message/message.module';
import { UserModule } from './modules/user/user.module';

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
  ],
  controllers: [AppController],
  providers: [AppService, MessageProvider],
})
export class AppModule {}
