import express, { json } from 'express';

const app = express();
const PORT = 3000;
const todos = [
  { id: 1, text: 'Learn Node.js', completed: false },
  { id: 2, text: 'Build TODO app', completed: false },
];

// middlewares
app.use(json());

// endpoints
app.get('/', (req, res) => {
  return res.json({ message: 'Hello World' });
});

app.get('/todos', (req, res) => {
  return res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id, 10);

  const todo = todos.find((todo) => todo.id === todoId);

  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  return res.json(todo);
});

app.post('/todos', (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ message: 'Text is required' });

  const newTodo = { id: todos.length + 1, text, completed: false };

  todos.push(newTodo);

  return res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const todoBody = req.body;

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1) return res.status(404).json({ message: 'Todo not found' });

  const todo = todos[todoIndex];
  const newTodo = { ...todo, ...todoBody };

  todos[todoIndex] = newTodo;

  return res.json(newTodo);
});

app.delete('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);

  const todoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (todoIndex === -1) return res.status(404).json({ message: 'Todo not found' });

  todos.splice(todoIndex, 1);

  return res.json(todos);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
