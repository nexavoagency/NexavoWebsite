const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let projects = [];
let enquiries = [];

const ADMIN_USERNAME = 'nexavo';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync('Nexavo@2024', 10);

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    jwt.verify(token, 'secret_key');
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

app.get('/', (req, res) => res.json({ message: 'Nexavo API is running!' }));
app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

app.get('/api/projects', (req, res) => {
  const { category } = req.query;
  let filtered = projects;
  if (category && category !== 'all') {
    filtered = projects.filter(p => p.category === category);
  }
  res.json({ success: true, projects: filtered });
});

app.post('/api/enquiries', (req, res) => {
  const enquiry = { id: enquiries.length + 1, ...req.body, timestamp: new Date().toISOString() };
  enquiries.push(enquiry);
  res.json({ success: true, message: 'Thank you! We will contact you soon.' });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USERNAME) return res.status(401).json({ error: 'Invalid credentials' });
  if (!bcrypt.compareSync(password, ADMIN_PASSWORD_HASH)) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ username }, 'secret_key', { expiresIn: '7d' });
  res.json({ success: true, token, admin: { username: ADMIN_USERNAME } });
});

app.post('/api/projects', authMiddleware, (req, res) => {
  const project = { id: projects.length + 1, ...req.body, created_at: new Date().toISOString() };
  projects.push(project);
  res.json({ success: true, project });
});

app.put('/api/projects/:id', authMiddleware, (req, res) => {
  const index = projects.findIndex(p => p.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Not found' });
  projects[index] = { ...projects[index], ...req.body };
  res.json({ success: true, project: projects[index] });
});

app.delete('/api/projects/:id', authMiddleware, (req, res) => {
  projects = projects.filter(p => p.id != req.params.id);
  res.json({ success: true });
});

app.get('/api/enquiries', authMiddleware, (req, res) => res.json({ success: true, enquiries }));

projects.push({ id: 1, title: "ERPNext Demo", description: "Sample ERPNext project", category: "ERPNext", image_url: "/placeholder.jpg", live_url: "#" });

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));