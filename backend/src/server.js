const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

let projects = [];
let enquiries = [];

// Admin
const ADMIN_USERNAME = 'nexavo';
const ADMIN_PASS_HASH = bcrypt.hashSync('Nexavo@2024', 10);

// Auth middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    jwt.verify(token, 'secret');
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Public routes
app.get('/', (req, res) => res.json({ message: 'Nexavo API' }));
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

app.get('/api/projects', (req, res) => {
  res.json({ success: true, projects });
});

app.post('/api/enquiries', (req, res) => {
  const enquiry = { id: Date.now(), ...req.body, timestamp: new Date() };
  enquiries.push(enquiry);
  res.json({ success: true, message: 'Thank you!' });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USERNAME) return res.status(401).json({ error: 'Invalid' });
  if (!bcrypt.compareSync(password, ADMIN_PASS_HASH)) return res.status(401).json({ error: 'Invalid' });
  const token = jwt.sign({ username }, 'secret', { expiresIn: '7d' });
  res.json({ success: true, token, admin: { username } });
});

// Protected
app.post('/api/projects', auth, (req, res) => {
  const project = { id: Date.now(), ...req.body };
  projects.push(project);
  res.json({ success: true, project });
});

app.put('/api/projects/:id', auth, (req, res) => {
  const index = projects.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  projects[index] = { ...projects[index], ...req.body };
  res.json({ success: true, project: projects[index] });
});

app.delete('/api/projects/:id', auth, (req, res) => {
  projects = projects.filter(p => p.id != req.params.id);
  res.json({ success: true });
});

app.get('/api/enquiries', auth, (req, res) => {
  res.json({ success: true, enquiries });
});

// Sample data
projects.push({ id: 1, title: "ERPNext Demo", description: "Sample project", category: "ERPNext", image_url: "/placeholder.jpg", live_url: "#" });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));