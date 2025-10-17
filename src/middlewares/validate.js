/**
 * Creates a validation middleware for a given Zod schema
 * @param {ZodSchema} schema - The Zod schema to validate against
 * @param {string} source - Where to get data from: 'body', 'params' or 'query'
 */

import z, { ZodError } from 'zod';

export const validate = (schema, source) => (req, res, next) => {
  try {
    // Get the data to validate based on source
    const dataToValidate = req[source];

    // Validate and parse the data
    const validatedData = schema.parse(dataToValidate);

    // Replace the original data with validated/transformed data
    req[source] = validatedData;

    // Move to the next middleware
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        details: z.treeifyError(error),
      });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
