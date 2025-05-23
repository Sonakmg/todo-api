const express = require('express');
const cors = require('cors');
const app = express();

// Helper function to generate random dates
function randomDate() {
  const start = new Date(2023, 0, 1);
  const end = new Date(2024, 0, 1);
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString().split('T')[0];
}

// Enhanced CORS configuration
const allowedOrigins = [
  'http://localhost:3000',
  'https://to-do-frontend-smoky.vercel.app',
  'https://to-do-frontend-gq58m6iwt-sonas-projects-3106105e.vercel.app',
  'https://to-do-frontend-cmvvmr4ti-sonas-projects-3106105e.vercel.app',
  'https://to-do-frontend-i65jk0j8e-sonas-projects-3106105e.vercel.app',
  'https://to-do-frontend-lhvwu1nxx-sonas-projects-3106105e.vercel.app',
  'https://to-do-frontend-7yl842fdp-sonas-projects-3106105e.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Request origin:', origin);
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'Origin', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400 // 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Enable preflight for all routes with the same options
app.use(express.json());

// Add request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Enhanced todo data structure
let todos = [
  {
    id: 1,
    title: "Complete project proposal",
    description: "Draft and submit the client project proposal",
    status: "completed",
    priority: "high",
    dueDate: "2023-11-15",
    createdAt: "2023-11-01T09:15:00Z",
    updatedAt: "2023-11-15T14:30:00Z"
  },
  {
    id: 2,
    title: "Review code submissions",
    description: "Check team's pull requests on GitHub",
    status: "in-progress",
    priority: "high",
    dueDate: randomDate(),
    createdAt: "2023-11-05T10:00:00Z",
    updatedAt: "2023-11-10T16:45:00Z"
  },
  {
    id: 3,
    title: "Update documentation",
    description: "Refresh API documentation for new features",
    status: "todo",
    priority: "medium",
    dueDate: randomDate(),
    createdAt: "2023-11-08T11:20:00Z",
    updatedAt: "2023-11-08T11:20:00Z"
  },
  {
    id: 4,
    title: "Schedule team meeting",
    description: "Organize weekly sprint planning",
    status: "completed",
    priority: "medium",
    dueDate: "2023-11-10",
    createdAt: "2023-11-06T14:00:00Z",
    updatedAt: "2023-11-10T10:15:00Z"
  },
  {
    id: 5,
    title: "Fix login page bug",
    description: "Mobile users can't submit form on iOS",
    status: "in-progress",
    priority: "critical",
    dueDate: randomDate(),
    createdAt: "2023-11-12T09:30:00Z",
    updatedAt: "2023-11-14T15:20:00Z"
  },
  {
    id: 6,
    title: "Research new frameworks",
    description: "Evaluate Svelte and Solid.js for new project",
    status: "todo",
    priority: "low",
    dueDate: randomDate(),
    createdAt: "2023-11-15T13:00:00Z",
    updatedAt: "2023-11-15T13:00:00Z"
  },
  {
    id: 7,
    title: "Prepare quarterly report",
    description: "Compile metrics and achievements for stakeholders",
    status: "todo",
    priority: "high",
    dueDate: randomDate(),
    createdAt: "2023-11-16T08:45:00Z",
    updatedAt: "2023-11-16T08:45:00Z"
  },
  {
    id: 8,
    title: "Update dependencies",
    description: "Run npm audit and update vulnerable packages",
    status: "in-progress",
    priority: "medium",
    dueDate: randomDate(),
    createdAt: "2023-11-14T11:10:00Z",
    updatedAt: "2023-11-17T09:25:00Z"
  },
  {
    id: 9,
    title: "Create database backup",
    description: "Schedule automatic daily backups",
    status: "completed",
    priority: "medium",
    dueDate: "2023-11-12",
    createdAt: "2023-11-10T14:30:00Z",
    updatedAt: "2023-11-12T10:00:00Z"
  },
  {
    id: 10,
    title: "Implement dark mode",
    description: "Add theme switching functionality",
    status: "completed",
    priority: "low",
    dueDate: "2023-11-18",
    createdAt: "2023-11-15T16:20:00Z",
    updatedAt: "2023-11-18T12:15:00Z"
  },
  {
    id: 11,
    title: "Optimize API responses",
    description: "Reduce payload size with compression",
    status: "todo",
    priority: "medium",
    dueDate: randomDate(),
    createdAt: "2023-11-19T10:00:00Z",
    updatedAt: "2023-11-19T10:00:00Z"
  },
  {
    id: 12,
    title: "Write unit tests",
    description: "Increase coverage to 80%",
    status: "in-progress",
    priority: "high",
    dueDate: randomDate(),
    createdAt: "2023-11-17T14:15:00Z",
    updatedAt: "2023-11-20T11:30:00Z"
  },
  {
    id: 13,
    title: "Design new logo",
    description: "Create branding assets for marketing",
    status: "todo",
    priority: "low",
    dueDate: randomDate(),
    createdAt: "2023-11-20T09:00:00Z",
    updatedAt: "2023-11-20T09:00:00Z"
  },
  {
    id: 14,
    title: "Migrate to new server",
    description: "Deploy application to AWS infrastructure",
    status: "todo",
    priority: "critical",
    dueDate: randomDate(),
    createdAt: "2023-11-18T15:45:00Z",
    updatedAt: "2023-11-18T15:45:00Z"
  },
  {
    id: 15,
    title: "Conduct user testing",
    description: "Organize sessions with 5 participants",
    status: "in-progress",
    priority: "high",
    dueDate: randomDate(),
    createdAt: "2023-11-19T11:20:00Z",
    updatedAt: "2023-11-21T14:10:00Z"
  },
  {
    id: 16,
    title: "Refactor authentication",
    description: "Implement JWT with refresh tokens",
    status: "todo",
    priority: "medium",
    dueDate: randomDate(),
    createdAt: "2023-11-21T13:00:00Z",
    updatedAt: "2023-11-21T13:00:00Z"
  },
  {
    id: 17,
    title: "Setup monitoring",
    description: "Configure New Relic for performance tracking",
    status: "completed",
    priority: "medium",
    dueDate: "2023-11-20",
    createdAt: "2023-11-15T10:30:00Z",
    updatedAt: "2023-11-20T16:45:00Z"
  },
  {
    id: 18,
    title: "Create onboarding docs",
    description: "Write guide for new team members",
    status: "in-progress",
    priority: "low",
    dueDate: randomDate(),
    createdAt: "2023-11-22T09:15:00Z",
    updatedAt: "2023-11-23T10:20:00Z"
  },
  {
    id: 19,
    title: "Plan team outing",
    description: "Research locations and activities",
    status: "todo",
    priority: "low",
    dueDate: randomDate(),
    createdAt: "2023-11-23T14:00:00Z",
    updatedAt: "2023-11-23T14:00:00Z"
  },
  {
    id: 20,
    title: "Implement search functionality",
    description: "Add full-text search to application",
    status: "todo",
    priority: "high",
    dueDate: randomDate(),
    createdAt: "2023-11-24T10:30:00Z",
    updatedAt: "2023-11-24T10:30:00Z"
  },
  {
    id: 21,
    title: "Upgrade database",
    description: "Migrate to PostgreSQL 15",
    status: "in-progress",
    priority: "critical",
    dueDate: randomDate(),
    createdAt: "2023-11-22T16:20:00Z",
    updatedAt: "2023-11-25T11:40:00Z"
  },
  {
    id: 22,
    title: "Create API documentation",
    description: "Generate Swagger/OpenAPI specs",
    status: "todo",
    priority: "medium",
    dueDate: randomDate(),
    createdAt: "2023-11-25T13:15:00Z",
    updatedAt: "2023-11-25T13:15:00Z"
  },
  {
    id: 23,
    title: "Setup CI/CD pipeline",
    description: "Configure GitHub Actions for deployment",
    status: "completed",
    priority: "high",
    dueDate: "2023-11-24",
    createdAt: "2023-11-20T11:00:00Z",
    updatedAt: "2023-11-24T15:30:00Z"
  },
  {
    id: 24,
    title: "Conduct security audit",
    description: "Check for vulnerabilities with OWASP tools",
    status: "todo",
    priority: "critical",
    dueDate: randomDate(),
    createdAt: "2023-11-26T09:45:00Z",
    updatedAt: "2023-11-26T09:45:00Z"
  },
  {
    id: 25,
    title: "Optimize database queries",
    description: "Add indexes and rewrite slow queries",
    status: "in-progress",
    priority: "high",
    dueDate: randomDate(),
    createdAt: "2023-11-25T15:10:00Z",
    updatedAt: "2023-11-27T10:25:00Z"
  }
];

// Add error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Add status colors configuration
const statusColors = {
  'todo': '#0078D4',      // Microsoft blue
  'in-progress': '#FFB900', // Microsoft yellow
  'completed': '#107C10'    // Microsoft green
};

// Helper function to find todo by ID
const findTodoById = (id) => {
  const todo = todos.find(todo => todo.id === id);
  if (!todo) throw new Error('Todo not found');
  return todo;
};

// Get all todos with filtering and sorting
app.get('/todos', (req, res) => {
  try {
    console.log('GET /todos - Query params:', req.query);
    const { status, priority, sort } = req.query;
    
    let filteredTodos = [...todos];
    
    if (status) {
      filteredTodos = filteredTodos.filter(todo => todo.status === status);
    }
    
    if (priority) {
      filteredTodos = filteredTodos.filter(todo => todo.priority === priority);
    }
    
    if (sort) {
      filteredTodos.sort((a, b) => {
        try {
          if (sort === 'dueDate') {
            // Handle null/undefined dueDates
            if (!a.dueDate && !b.dueDate) return 0;
            if (!a.dueDate) return 1;
            if (!b.dueDate) return -1;
            return new Date(a.dueDate) - new Date(b.dueDate);
          }
          // Handle other sort fields
          if (a[sort] === b[sort]) return 0;
          return a[sort] > b[sort] ? 1 : -1;
        } catch (error) {
          console.error('Error in sorting:', error);
          return 0; // Return unchanged order if sorting fails
        }
      });
    }
    
    // Add color property to each todo based on status
    filteredTodos = filteredTodos.map(todo => ({
      ...todo,
      color: statusColors[todo.status] || '#0078D4' // Default to Microsoft blue if status not found
    }));
    
    console.log(`Returning ${filteredTodos.length} todos`);
    res.json(filteredTodos);
  } catch (error) {
    console.error('Error in GET /todos:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get single todo
app.get('/todos/:id', (req, res) => {
  try {
    const todo = findTodoById(parseInt(req.params.id));
    res.json(todo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Create todo
app.post('/todos', (req, res) => {
  try {
    const { title, description, status = 'todo', priority = 'medium', dueDate } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }
    
    const newTodo = {
      id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
      title,
      description: description || '',
      status,
      priority,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update todo
app.put('/todos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) throw new Error('Todo not found');
    
    const updatedTodo = {
      ...todos[todoIndex],
      ...req.body,
      updatedAt: new Date().toISOString(),
      id // Prevent ID change
    };
    
    todos[todoIndex] = updatedTodo;
    res.json(updatedTodo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete todo
app.delete('/todos/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const initialLength = todos.length;
    todos = todos.filter(todo => todo.id !== id);
    
    if (todos.length === initialLength) {
      throw new Error('Todo not found');
    }
    
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Process error handlers
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed CORS origins: ${allowedOrigins.join(', ')}`);
});