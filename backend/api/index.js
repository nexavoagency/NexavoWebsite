const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is working!' });
});

// Get projects
app.get('/api/projects', (req, res) => {
  res.json({ success: true, projects: [] });
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
  console.log('Enquiry:', req.body);
  res.json({ success: true, message: 'Thank you! We will contact you soon.' });
});

module.exports = app;