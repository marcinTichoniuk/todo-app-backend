import express, { json } from 'express';
import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from './controllers/todoController.js';

const app = express();
const PORT = 3000;

// middlewares
app.use(json());

// endpoints
app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

app.get('/todos', getAllTodos);

app.get('/todos/:id', getTodoById);

app.post('/todos', createTodo);

app.put('/todos/:id', updateTodo);

app.delete('/todos/:id', deleteTodo);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
