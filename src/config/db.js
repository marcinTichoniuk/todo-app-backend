import mongoose from 'mongoose';
import { config } from './config.js';

export const connectDB = async () => {
  try {
    // MongoDB driver options (connection layer options)
    const options = {
      // Automatically build indexes (helpful in development)
      autoIndex: config.isDevelopment(),
    };

    const conn = await mongoose.connect(config.db.uri, options);

    console.log(`MongoDB connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);

    // Mongoose options (ODM layer options)
    if (config.isDevelopment()) {
      // Logs all MongoDB queries
      mongoose.set('debug', true);
    }
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  } catch (error) {
    console.error(`Error disconnecting MongoDB: ${error.message}`);
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
  console.error('Mongoose connection error:', error);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});
