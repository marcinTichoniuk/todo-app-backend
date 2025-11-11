import { Todo } from '../models/todoModel.js';
import { NotFoundError } from '../utils/customErrors.js';

export const getAllTodos = async (req, res, next) => {
  try {
    const allTodos = await Todo.find();

    return res.json(allTodos);
  } catch (error) {
    next(error);
  }
};

export const getTodoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);

    if (!todo) {
      throw new NotFoundError('Todo not found');
    }

    return res.json(todo);
  } catch (error) {
    next(error);
  }
};

export const createTodo = async (req, res, next) => {
  try {
    const { text } = req.body;

    const newTodo = await Todo.create({ text, completed: false });

    return res.status(201).json(newTodo);
  } catch (error) {
    next(error);
  }
};

export const updateTodo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const todoBody = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(id, { ...todoBody }, { new: true });

    if (!updatedTodo) {
      throw new NotFoundError('Todo not found');
    }

    return res.json(updatedTodo);
  } catch (error) {
    next(error);
  }
};

export const deleteTodo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (!deletedTodo) {
      throw new NotFoundError('Todo not found');
    }

    return res.json(deletedTodo);
  } catch (error) {
    next(error);
  }
};
