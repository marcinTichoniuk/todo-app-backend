import express, { json } from 'express';
import todoRoutes from './routes/todoRoutes.js';
import { config } from './config/config.js';

const app = express();
const PORT = config.port;

// middlewares
app.use(json());

// endpoints
app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

// routes
app.use('/todos', todoRoutes);

// start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
