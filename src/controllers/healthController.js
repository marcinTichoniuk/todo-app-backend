import mongoose from 'mongoose';
import { config } from '../config/config.js';

/**
 * Standard health check response format
 * @typedef {Object} HealthCheckResponse
 * @property {string} status - 'healthy' | 'unhealthy' | 'degraded'
 * @property {string} timestamp - ISO 8601 timestamp
 * @property {string} [version] - Application version
 * @property {Object} [checks] - Individual component checks
 */

export const getHealthcheck = (req, res) => {
  return res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: config.apiVersion,
  });
};

export const getDatabaseHealthcheck = (req, res, next) => {
  try {
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const dbState = mongoose.connection.readyState;
    const isHealthy = dbState === 1;

    return res.status(isHealthy ? 200 : 503).json({
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      version: config.apiVersion,
      checks: {
        database: {
          state: dbState,
        },
      },
    });
  } catch (error) {
    return res.status(503).json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString(),
    });
  }
};
