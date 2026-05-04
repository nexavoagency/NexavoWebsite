const express = require('express');
const cors = require('cors');
const app = express();

// CORS - Specific for Netlify
app.use(cors({
  origin: 'https://nexavoagency.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight
app.options('*', cors());

app.use(express.json());

let projects = [];
let enquiries = [];

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.get('/api/projects', (req, res) => {
  res.json({ success: true, projects });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'nexavo' && password === 'Nexavo2024') {
    res.json({ success: true, token: 'dummy', admin: { username } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/enquiries', (req, res) => {
  enquiries.push(req.body);
  res.json({ success: true, message: 'Thank you!' });
});

module.exports = app;