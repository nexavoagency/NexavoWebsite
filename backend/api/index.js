const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();

// CORS configuration
app.use(cors({
  origin: ['https://nexavoagency.netlify.app', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

let projects = [];
let enquiries = [];

const ADMIN_USER = 'nexavo';
const ADMIN_PASS = bcrypt.hashSync('Nexavo@2024', 10);

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    jwt.verify(token, 'secret_key');
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is running!' });
});

app.get('/api/projects', (req, res) => {
  res.json({ success: true, projects });
});

app.post('/api/enquiries', (req, res) => {
  const enquiry = { id: Date.now(), ...req.body, timestamp: new Date() };
  enquiries.push(enquiry);
  res.json({ success: true, message: 'Thank you! We will contact you soon.' });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username);
  
  if (username !== ADMIN_USER) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  if (!bcrypt.compareSync(password, ADMIN_PASS)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  
  const token = jwt.sign({ username }, 'secret_key', { expiresIn: '7d' });
  res.json({ success: true, token, admin: { username } });
});

app.post('/api/projects', auth, (req, res) => {
  const project = { id: Date.now(), ...req.body };
  projects.push(project);
  res.json({ success: true, project });
});

app.delete('/api/projects/:id', auth, (req, res) => {
  projects = projects.filter(p => p.id != req.params.id);
  res.json({ success: true });
});

app.options('*', cors());

// Add sample data
projects.push({ 
  id: 1, 
  title: "ERPNext Demo", 
  description: "Sample ERP project", 
  category: "ERPNext", 
  image_url: "https://via.placeholder.com/400", 
  live_url: "#" 
});

module.exports = app;