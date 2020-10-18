import { Injectable } from '@nestjs/common';
import * as parse from 'csv-parse';
import { Observable } from 'rxjs';
import { CustomLogger } from '../logger/CustomLogger';
import { ParsedStockCodeResponse } from './dtos/parsedStockCodeResponse.dto';

@Injectable()
export class AppService {
  constructor(private readonly logger: CustomLogger) {
    this.logger.setContext('AppService');
  }

  async handleResponse(csv: string, roomName: string, stockCode: string) {
    return this.getParsedData(csv).then(parsedData => {
      let message = `No quote for ${stockCode}`;

      if (parsedData.records.length !== 0) {
        const { Volume: perShare, Symbol } = parsedData.records[0];
        if (perShare !== 'N/D') {
          const parsedPerShare = parseFloat(perShare);
          message = `${Symbol} quote is $${parsedPerShare} per share`;
        }
      }
      return { message, roomName };
    });
  }

  getParsedData(csv: string) {
    return new Promise<{
      records: ParsedStockCodeResponse[];
      info: parse.Info;
    }>((resolve, reject) => {
      parse(
        csv,
        {
          columns: true,
          skip_empty_lines: true,
        },
        (err: Error, records: any, info: parse.Info) => {
          if (err) {
            reject(err);
          }
          resolve({ info, records });
        },
      );
    });
  }
}
