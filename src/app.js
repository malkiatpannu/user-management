const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');    
const auth = require('./middlewares/authMiddleware');
const authorize = require('./middlewares/roleMiddleware');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(helmet());

// Health check
app.get('/', (req, res) => {
    res.json({ message: "API Running successfully" });
});
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.get('/api/protected', auth, (req, res) => {
    res.json({ message: "Access granted to protected route", user: req.user });
});
app.get('/api/admin', auth, authorize('admin', 'user'), (req, res) => {
    res.json({ message: "Admin only" });
});

app.use(errorHandler);
module.exports = app;