import { Router } from 'express';
import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from '../controllers/todoController.js';
import { validate } from '../middlewares/validate.js';
import { createTodoSchema, todoIdSchema, updateTodoSchema } from '../validators/todoSchema.js';

const router = Router();

router.get('/', getAllTodos);
router.get('/:id', validate(todoIdSchema, 'params'), getTodoById);
router.post('/', validate(createTodoSchema, 'body'), createTodo);
router.put('/:id', validate(todoIdSchema, 'params'), validate(updateTodoSchema, 'body'), updateTodo);
router.delete('/:id', validate(todoIdSchema, 'params'), deleteTodo);

export default router;
