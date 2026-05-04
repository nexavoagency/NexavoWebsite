const express = require('express');
const cors = require('cors');
const app = express();

// CORS setup
app.use(cors({
  origin: ['https://nexavoagency.netlify.app', 'http://localhost:3000'],
  credentials: true
}));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is working!' });
});

app.get('/api/projects', (req, res) => {
  res.json({ success: true, projects: [] });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'nexavo' && password === 'Nexavo2024') {
    res.json({ success: true, token: 'dummy-token', admin: { username } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/enquiries', (req, res) => {
  res.json({ success: true, message: 'Received! Thank you.' });
});

module.exports = app;