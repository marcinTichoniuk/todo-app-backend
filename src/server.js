import express, { json } from 'express';
import todoRoutes from './routes/todoRoutes.js';
import { config } from './config/config.js';
import { connectDB } from './config/db.js';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js';

const app = express();
const PORT = config.port;

// middlewares
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
Option B: MongoDB Integration - Add real database (we're ready with DB_URI!)
Option C: CORS - Connect to React front-end
Option E: Request Logging - Add logging middleware (Morgan or custom)
*/
