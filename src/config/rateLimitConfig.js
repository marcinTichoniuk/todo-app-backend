import rateLimit from 'express-rate-limit';

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 request per windowMs
  message: {
    error: {
      type: 'RateLimitError',
      message: 'Too many requests, please try again later.',
      details: 'Retry after 15 minutes',
      timestamp: new Date().toISOString(),
      path: null,
    },
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req) => {
    return req.path.startsWith('/health');
  },
});

export const createLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10,
  message: {
    error: {
      type: 'RateLimitError',
      message: 'Too many resources created, please try again later.',
      details: 'Retry after 1 hour',
      timestamp: new Date().toISOString(),
      path: null,
    },
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => {
    return req.path.startsWith('/health');
  },
});
