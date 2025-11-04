import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: [true, 'Text is required'],
      trim: true,
      minlength: [1, 'Text cannot be empty'],
      maxlength: [200, 'Text must be less than 200 characters'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index definition - it's created if autoIndex: true or manually if false
// Index for filtering by completion status
// Useful for queries like: "Show me all completed todos"
todoSchema.index({ completed: 1 });

// Index definition - it's created if autoIndex: true or manually if false
// Index for sorting by creation date (newest first)
// Useful for queries like: "Show me latest todos"
todoSchema.index({ createdAt: -1 });

export const Todo = mongoose.model('Todo', todoSchema);

// Create todo:
// const newTodo = await Todo.create({ text: 'Learn', completed: false });

// Find todo:
// const allTodos = await Todo.find();
// const todo = await Todo.findById('abc');

// Update todo:
// const updatedTodo = await Todo.findByIdAndUpdate('abc', { completed: true }, { new: true });

// Delete todo:
// const deletedTodo = await Todo.findByIdAndDelete('abc')
