import { config } from './config.js';

// It's not really testable without frontend - use curl
const allowedOrigins = config.isDevelopment()
  ? ['http://localhost:3000', 'http://localhost:3001']
  : ['https://yourdomain.com'];

export const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, server-to-server requests, checking endpoints directly in browser)
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
