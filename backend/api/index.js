const express = require('express');
const cors = require('cors');
const app = express();

// ✅ CORS Fix
app.use(cors({
  origin: 'https://nexavoagency.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Nexavo Backend is running!', status: 'active' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend is working!' });
});

app.get('/api/projects', (req, res) => {
  res.json({ success: true, projects: [] });
});

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

app.post('/api/enquiries', (req, res) => {
  console.log('Enquiry:', req.body);
  res.json({ success: true, message: 'Thank you! We will contact you soon.' });
});

// ✅ Vercel ke liye module.exports - app.listen() nahi chahiye
module.exports = app;