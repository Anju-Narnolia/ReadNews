const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS settings — allow frontend to talk to backend
const corsOptions = {
  origin: ['http://localhost:3000'], // Add your Render frontend URL after deployment
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Import API routes
const fetchNews = require('./api/fetch-news');
const getNews = require('./api/get-news');

// API Endpoints
app.get('/api/fetch-news', fetchNews);
app.get('/api/get-news', getNews);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'News API server is running' });
});

// Serve React build folder
app.use(express.static(path.join(__dirname, 'build')));

// Catch-all for React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
