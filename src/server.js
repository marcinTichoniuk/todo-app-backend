import express, { json } from 'express';
import cors from 'cors';
import todoRoutes from './routes/todoRoutes.js';
import { config } from './config/config.js';
import { connectDB } from './config/db.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';
import { corsOptions } from './config/corsOptions.js';

const app = express();
const PORT = config.port;

// middlewares
app.use(json());
app.use(cors(corsOptions));

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

// error handlers
app.use(notFoundHandler);
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
Helmet - Security headers (high priority)
Morgan - Request logging (high priority)
Compression - Faster responses (medium)
Sanitization - Prevent injection (medium)
Health check - Monitoring (medium)
*/
