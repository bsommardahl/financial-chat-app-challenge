import { Injectable, Logger, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger extends Logger {
  logWithData(message: any, data: any) {
    this.log(`${message}: ${JSON.stringify(data)}`);
  }
}
