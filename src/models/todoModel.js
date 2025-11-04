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

/**
 * Indexes for better query performance
 * These are DEFINITIONS - actual creation depends on autoIndex option (if true - they are created automatically, if false - we have to create them manually)
 */

// Index for filtering by completion status
// Useful for queries like: "Show me all completed todos"
todoSchema.index({ completed: 1 });

// Index for sorting by creation date (newest first)
// Useful for queries like: "Show me latest todos"
todoSchema.index({ createdAt: -1 });

/**
 * Virtual Properties
 * Computed fields that don't get stored in MongoDB
 */

// Virtual: status
// Returns "done" if completed, "pending" if not
todoSchema.virtual('status').get(function () {
  return this.completed ? 'done' : 'pending';
});

/**
 * Schema Options for JSON Output
 * Controls what appears when document is converted to JSON
 */
todoSchema.set('toJSON', {
  virtuals: true,
});

/**
 * Create the Todo model
 * Mongoose will automatically create a 'todos' collection
 */
export const Todo = mongoose.model('Todo', todoSchema);

/**
 * DB basic methods
 */

// Create todo:
// const newTodo = await Todo.create({ text: 'Learn', completed: false });

// Find todo:
// const allTodos = await Todo.find();
// const todo = await Todo.findById('abc');

// Update todo:
// const updatedTodo = await Todo.findByIdAndUpdate('abc', { completed: true }, { new: true });

// Delete todo:
// const deletedTodo = await Todo.findByIdAndDelete('abc')
