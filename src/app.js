const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const auth = require('./middlewares/authMiddleware');
const authorize = require('./middlewares/roleMiddleware');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Health check
app.get('/', (req, res) => {
    res.json({ message: "API Running successfully" });
});
app.use('/api/auth', authRoutes);
app.get('/api/protected', auth, (req, res) => {
    res.json({ message: "Access granted to protected route", user: req.user });
});
app.get('/api/admin', auth, authorize('admin', 'user'), (req, res) => {
    res.json({ message: "Admin only" });
});

module.exports = app;