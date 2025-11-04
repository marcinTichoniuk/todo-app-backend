import z from 'zod';

export const todoSchema = z.object({
  id: z.int().positive(),
  text: z.string().min(1, 'Text cannot be empty').max(200, 'Text must be less than 200 characters').trim(),
  completed: z.boolean(),
});

export const createTodoSchema = todoSchema.pick({ text: true });

export const updateTodoSchema = todoSchema
  .pick({ text: true, completed: true })
  .partial()
  .refine((data) => data.text !== undefined || data.completed !== undefined, {
    error: 'At least one field (text or completed) must be provided',
  });

export const todoIdSchema = z.object({
  id: z.string().length(24, { error: 'id length should be 24' }),
});
