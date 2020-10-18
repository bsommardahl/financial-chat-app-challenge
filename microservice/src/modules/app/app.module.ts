import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigModule } from '../config/config.module';
import { MessageProvider } from '../../providers/message';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [AppConfigModule, HttpModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService, MessageProvider],
})
export class AppModule {}
