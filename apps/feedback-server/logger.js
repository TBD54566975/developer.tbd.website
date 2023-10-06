const pino = require('pino');
const pinoHttp = require('pino-http');

let pinoPrettyConfig;
try {
  pinoPrettyConfig = require('pino-pretty')({ colorize: true });
} catch (e) {
  // this is fine, production environment won't have nor need pino-pretty
}

const logger = pino(pinoPrettyConfig);
const httpLogger = pinoHttp({ logger });

module.exports = { logger, httpLogger };
