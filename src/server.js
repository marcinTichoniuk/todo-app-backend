import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import todoRoutes from './routes/todoRoutes.js';
import { config } from './config/config.js';
import { connectDB } from './config/db.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import { corsOptions } from './config/corsOptions.js';

const app = express();
const PORT = config.port;

// middlewares
app.use(
  helmet({
    // it's not needed if API returns JSON, not HTML
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);
app.use(cors(corsOptions));
app.use(json());

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
Rate limiting - Prevent abuse (high priority)
✅ Helmet - Security headers (high priority)
Morgan - Request logging (high priority)
✅ CORS - allow frontend to connect with backend from different origin (high priority) 
Compression - Faster responses (medium)
Sanitization - Prevent injection (medium)
Health check - Monitoring (medium)
*/
