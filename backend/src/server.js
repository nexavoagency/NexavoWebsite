const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
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

// Public routes
app.get('/', (req, res) => res.json({ message: 'Nexavo API Running!' }));
app.get('/api/health', (req, res) => res.json({ status: 'OK', time: new Date().toISOString() }));
app.get('/api/projects', (req, res) => {
  const { category } = req.query;
  let filtered = projects;
  if (category && category !== 'all') {
    filtered = projects.filter(p => p.category === category);
  }
  res.json({ success: true, projects: filtered });
});
app.post('/api/enquiries', (req, res) => {
  const enquiry = { id: Date.now(), ...req.body, timestamp: new Date() };
  enquiries.push(enquiry);
  res.json({ success: true, message: 'Thank you!' });
});

// Login
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USER) return res.status(401).json({ error: 'Invalid' });
  if (!bcrypt.compareSync(password, ADMIN_PASS)) return res.status(401).json({ error: 'Invalid' });
  const token = jwt.sign({ username }, 'secret_key', { expiresIn: '7d' });
  res.json({ success: true, token, admin: { username } });
});

// Protected
app.post('/api/projects', auth, (req, res) => {
  const project = { id: Date.now(), ...req.body };
  projects.push(project);
  res.json({ success: true, project });
});
app.delete('/api/projects/:id', auth, (req, res) => {
  projects = projects.filter(p => p.id != req.params.id);
  res.json({ success: true });
});
app.get('/api/enquiries', auth, (req, res) => res.json({ success: true, enquiries }));

projects.push({ id: 1, title: "ERPNext Demo", description: "Sample", category: "ERPNext", image_url: "https://via.placeholder.com/400", live_url: "#" });

module.exports = app;