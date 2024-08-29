require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const authenticateToken = require('./middleware/auth');
const authorizeRole = require('./middleware/roles');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(express.json());


app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route is working!' });
});

// Login route
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Example of a protected route
app.get('/api/protected', authenticateToken, authorizeRole(['Admin', 'Super Admin']), (req, res) => {
  res.json({ message: 'This is a protected route for Admins and Super Admins' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
