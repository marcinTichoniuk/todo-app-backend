import z, { ZodError } from 'zod';
import { config } from '../config/config.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'CastError') {
    return res.status(400).json({
      error: {
        type: 'CastError',
        message: 'Ivalid format',
        details: null,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      },
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: {
        type: 'ValidationError',
        message: 'Mongoose validation failed',
        details: null,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      },
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        type: 'ZodValidationError',
        message: 'Request validation failed',
        details: z.treeifyError(err),
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      },
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];

    return res.status(409).json({
      error: {
        type: 'DuplicateError',
        message: `${field} alread exists`,
        details: null,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      },
    });
  }

  if (err.statusCode) {
    return res.status(err.statusCode).json({
      error: {
        type: 'ApplicationError',
        message: err.message,
        details: null,
        timestamp: new Date().toISOString(),
        path: req.originalUrl,
      },
    });
  }

  return res.status(500).json({
    error: {
      type: 'InternalServerError',
      message: err.message,
      details: config.isProduction() ? 'Unexpected error' : err.message,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    },
  });
};

export const notFoundHandler = (req, res) => {
  return res.status(404).json({
    error: {
      type: 'NotFoundError',
      message: `Route not found for: ${req.method} ${req.path}`,
      details: null,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    },
  });
};

// MongoDB/Mongoose errors (some):
// CastError - Happens when ID format is invalid
// ValidationError - Happens when data doesn't match schema
