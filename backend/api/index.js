const express = require('express');
const cors = require('cors');
const app = express();

// CORS - Allow Netlify frontend
const corsOptions = {
  origin: 'https://nexavoagency.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Handle preflight requests
app.options('*', cors(corsOptions));

// In-memory storage
let projects = [
  {
    id: 1,
    title: "ERPNext Demo",
    description: "Sample ERPNext project",
    category: "ERPNext",
    image_url: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
    live_url: "#"
  }
];
let enquiries = [];

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is working!' });
});

// Get projects (with category filter)
app.get('/api/projects', (req, res) => {
  const { category } = req.query;
  let filtered = projects;
  if (category && category !== 'all') {
    filtered = projects.filter(p => p.category === category);
  }
  res.json({ success: true, projects: filtered });
});

// Add new project
app.post('/api/projects', (req, res) => {
  const { title, description, category, image_url, live_url } = req.body;
  const newProject = {
    id: Date.now(),
    title,
    description,
    category,
    image_url: image_url || "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400",
    live_url: live_url || "#",
    created_at: new Date().toISOString()
  };
  projects.push(newProject);
  res.json({ success: true, project: newProject });
});

// Delete project
app.delete('/api/projects/:id', (req, res) => {
  projects = projects.filter(p => p.id != req.params.id);
  res.json({ success: true });
});

// Login route
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username);
  
  if (username === 'nexavo' && password === 'Nexavo2024') {
    res.json({ 
      success: true, 
      token: 'hardcoded-token-2024', 
      admin: { username: 'nexavo' } 
    });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

// Contact form
app.post('/api/enquiries', (req, res) => {
  const enquiry = { id: Date.now(), ...req.body, timestamp: new Date().toISOString() };
  enquiries.push(enquiry);
  console.log('Enquiry:', enquiry);
  res.json({ success: true, message: 'Thank you! We will contact you soon.' });
});

// Get enquiries (admin only)
app.get('/api/enquiries', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (token === 'hardcoded-token-2024') {
    res.json({ success: true, enquiries });
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = app;