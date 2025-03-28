const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// In-memory storage for to-do items
let todos = [
  { id: 1, title: "Learn Express", completed: false },
  { id: 2, title: "Build a REST API", completed: false }
];

// Get all to-dos (GET /todos)
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Get a single to-do by ID (GET /todos/:id)
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(todo => todo.id === id);
  if (!todo) return res.status(404).json({ error: "To-do not found" });
  res.json(todo);
});

// Create a new to-do (POST /todos)
app.post('/todos', (req, res) => {
  const { title, completed = false } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const newTodo = { id: todos.length + 1, title, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a to-do (PUT /todos/:id)
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex === -1) return res.status(404).json({ error: "To-do not found" });
  todos[todoIndex] = { ...todos[todoIndex], ...req.body };
  res.json(todos[todoIndex]);
});

// Delete a to-do (DELETE /todos/:id)
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex === -1) return res.status(404).json({ error: "To-do not found" });
  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});