import { Todo } from '../models/todoModel.js';

export const getAllTodos = async (req, res) => {
  try {
    const allTodos = await Todo.find();

    return res.json(allTodos);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res.json(todo);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid todo ID format' });
    }

    return res.status(500).json({ error: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const { text } = req.body;

    const newTodo = await Todo.create({ text, completed: false });

    return res.status(201).json(newTodo);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todoBody = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(id, { ...todoBody }, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res.json(updatedTodo);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid todo ID format' });
    }

    return res.status(500).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res.json(deletedTodo);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid todo ID format' });
    }

    return res.status(500).json({ error: error.message });
  }
};

// MongoDB/Mongoose errors (some):
// CastError - Happens when ID format is invalid
// ValidationError - Happens when data doesn't match schema
