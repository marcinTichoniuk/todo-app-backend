import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import todoRoutes from './routes/todoRoutes.js';
import healthRoutes from './routes/healthRoutes.js';
import { config } from './config/config.js';
import { connectDB } from './config/db.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import { corsOptions } from './config/corsOptions.js';
import { apiLimiter } from './config/rateLimitConfig.js';
import { requestLogger } from './middlewares/requestLogger.js';

const app = express();
const PORT = config.port;

// middlewares
app.use(
  helmet({
    // both options are not needed if API returns JSON, not HTML
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(cors(corsOptions)); // enable CORS for all routes
app.use(apiLimiter); // apply rate limiting to all routes
app.use(json());

// logger
app.use(requestLogger);

// endpoints
app.get('/', (req, res) => {
  return res.json({
    message: 'TODO API is running',
    version: config.apiVersion,
    environment: config.environment,
    database: 'connected',
  });
});

// routes
app.use('/health', healthRoutes);
app.use('/todos', todoRoutes);

// 404 handler
app.use(notFoundHandler);

// error handler
app.use(errorHandler);

// start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  } catch (error) {
    console.log('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();

/* 
Rate limiting - Prevent abuse (high priority) - come back to this when implementing authentication and Redis
✅ Helmet - Security headers (high priority)
✅ Morgan - Request logging (high priority)
✅ CORS - Allow frontend to connect with backend from different origin (high priority) 

✅ Health check - Monitoring (medium)
Sanitization - Prevent injection (medium)
Compression - Faster responses (medium) - rather on infra level
*/
