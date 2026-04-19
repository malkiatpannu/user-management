const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');

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

module.exports = app;