const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const contactRoutes = require('./routes/contactRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;
const rawClientUrls = process.env.CLIENT_URLS || '';
const allowedOrigins = rawClientUrls
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Origin is not allowed by CORS.'));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_req, res) => {
  res.status(200).json({ success: true, message: 'API is running.' });
});

app.use('/api', contactRoutes);

app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    success: false,
    message: 'Internal server error.',
    ...(process.env.NODE_ENV !== 'production' ? { details: error.message } : {}),
  });
});

async function startServer() {
  try {
    if (!mongoUri) {
      throw new Error('MONGO_URI is missing in environment variables.');
    }

    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully.');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
