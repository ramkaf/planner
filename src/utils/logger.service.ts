import { Injectable, LoggerService as NestLoggerService } from '@nestjs/common';

@Injectable()
export class CustomLoggerService implements NestLoggerService {
  log(message: string) {
    console.log(`\x1b[32m${message}\x1b[0m`); // Green for success
  }

  error(message: string, trace: string) {
    console.log(`\x1b[31m${message}\x1b[0m`); // Red for errors
    console.error(trace);
  }

  warn(message: string) {
    console.log(`\x1b[33m${message}\x1b[0m`); // Yellow for warnings
  }

  debug(message: string) {
    console.log(`\x1b[34m${message}\x1b[0m`); // Blue for debug
  }

  verbose(message: string) {
    console.log(`\x1b[36m${message}\x1b[0m`); // Cyan for verbose
  }
}
