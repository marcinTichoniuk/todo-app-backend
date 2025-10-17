const todos = [
  { id: 1, text: 'Learn Node.js', completed: false },
  { id: 2, text: 'Build TODO app', completed: false },
];

export const getAllTodos = (req, res) => {
  return res.json(todos);
};

export const getTodoById = (req, res) => {
  const { id } = req.params;

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  return res.json(todo);
};

export const createTodo = (req, res) => {
  const { text } = req.body;

  const newTodo = { id: todos.length + 1, text, completed: false };

  todos.push(newTodo);

  return res.status(201).json(newTodo);
};

export const updateTodo = (req, res) => {
  const { id } = req.params;
  const todoBody = req.body;

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) return res.status(404).json({ message: 'Todo not found' });

  const todo = todos[todoIndex];
  const newTodo = { ...todo, ...todoBody };

  todos[todoIndex] = newTodo;

  return res.json(newTodo);
};

export const deleteTodo = (req, res) => {
  const { id } = req.params;

  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex === -1) return res.status(404).json({ message: 'Todo not found' });

  todos.splice(todoIndex, 1);

  return res.json(todos);
};
