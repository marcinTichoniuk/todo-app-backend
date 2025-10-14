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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
