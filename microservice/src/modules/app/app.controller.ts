import { Controller, HttpService, Get, Inject } from '@nestjs/common';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { AxiosResponse } from 'axios';
import { CustomLogger } from '../logger/CustomLogger';
import { AppService } from './app.service';
import { StockCodeRequest } from './dtos/stockCodeRequest.dto';

@Controller()
export class AppController {
  constructor(
    @Inject('MESSAGE_SERVICE') private readonly client: ClientProxy,
    private readonly httpService: HttpService,
    private readonly appService: AppService,
    private readonly logger: CustomLogger,
  ) {
    this.logger.setContext('AppController');
  }

  @EventPattern('some-message')
  async handleMessagePrinted(data: Record<string, unknown>) {
    this.logger.logWithData('Received some-message', data);

    this.client.emit('some-message-response', data);
  }

  @EventPattern('stock-code')
  async handleStockCodeRequest(data: StockCodeRequest) {
    this.httpService
      .get<string>(
        `https://stooq.com/q/l/?s=${data.stockCode}&f=sd2t2ohlcv&h&e=csv`,
      )
      .subscribe({
        next: (res: AxiosResponse<string>) =>
          this.appService
            .handleResponse(res.data, data.roomName, data.stockCode)
            .then(response => {
              this.logger.logWithData('response', response);
              this.client.emit('stock-message', response);
            }),
        error: error => {
          this.logger.logWithData('error', error);
        },
      });
  }
}
