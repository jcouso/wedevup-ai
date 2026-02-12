/**
 * Simple structured logger (pino wrapper).
 */

import pino from 'pino';

const baseLogger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: process.env.NODE_ENV !== 'production'
    ? { target: 'pino/file', options: { destination: 1 } }
    : undefined,
});

export function createLogger(name) {
  return baseLogger.child({ module: name });
}
