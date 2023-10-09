import pino from 'pino';
import pinoHttp from 'pino-http';

import { config } from './config.js';

let pinoConfig;
if (config.devMode || config.testMode) {
  // pino-pretty makes the logs look nice in development mode
  pinoConfig = {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  };
}

// set test level to warning
if (config.testMode) {
  pinoConfig.level = 'warn';
}

const logger = pino(pinoConfig);
const httpLogger = pinoHttp({ logger });

export { logger, httpLogger };
