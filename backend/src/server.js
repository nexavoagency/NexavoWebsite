const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
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
    res.json({ success: true, token: 'dummy-token-123', admin: { username } });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/api/enquiries', (req, res) => {
  res.json({ success: true, message: 'Received! Thank you.' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on ${PORT}`));