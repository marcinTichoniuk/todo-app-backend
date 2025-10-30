import express, { json } from 'express';
import todoRoutes from './routes/todoRoutes.js';
import { config } from './config/config.js';
import { connectDB } from './config/db.js';

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

// start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}...`);
    });
  } catch (error) {
    console.log('Failed to start the server:', error);
    process.exit(1);
  }
};

startServer();
