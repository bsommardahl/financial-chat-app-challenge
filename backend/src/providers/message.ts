import { Provider } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { AppConfigService } from '../modules/config/config.service';

export const MessageProvider: Provider = {
  provide: 'MESSAGE_SERVICE',
  useFactory: (configService: AppConfigService) => {
    const options = configService.getRabbitmqOptions();
    return ClientProxyFactory.create(options);
  },

  inject: [AppConfigService],
};
