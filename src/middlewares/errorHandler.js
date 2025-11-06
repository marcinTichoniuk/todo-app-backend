import z, { ZodError } from 'zod';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'ID format is invalid',
    });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Mongoose validation error',
    });
  }

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Zod validation error',
      details: z.treeifyError(err),
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];

    return res.status(409).json({
      error: 'Duplicate value',
      message: `${field} alread exists`,
    });
  }

  return res.status(err.statusCode ?? 500).json({
    error: err.message ?? 'Internal server error',
  });
};

export const notFoundHandler = (req, res) => {
  return res.status(404).json({
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.path}`,
  });
};

// MongoDB/Mongoose errors (some):
// CastError - Happens when ID format is invalid
// ValidationError - Happens when data doesn't match schema
