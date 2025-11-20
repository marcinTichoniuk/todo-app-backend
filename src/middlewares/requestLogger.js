/**
 * Morgan Logger Configuration
 *
 * Morgan formats:
 * - 'dev': Colored output for development (method, url, status, time, size)
 * - 'combined': Apache combined log format (production standard)
 * - 'common': Apache common log format
 * - 'short': Shorter format with response time
 * - 'tiny': Minimal output
 */

import morgan from 'morgan';

import { config } from '../config/config.js';

const skippedUrls = ['/health', '/.well-known'];

const loggerFormat = config.isDevelopment() ? 'dev' : 'combined';

export const requestLogger = morgan(loggerFormat, {
  skip: (req) => {
    return skippedUrls.some((url) => req.originalUrl.startsWith(url));
  },
});
