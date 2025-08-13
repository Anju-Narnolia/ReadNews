const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import API routes
const fetchNews = require('./api/fetch-news');
const getNews = require('./api/get-news');

// API Routes
app.get('/api/fetch-news', fetchNews);
app.get('/api/get-news', getNews);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'News API server is running' });
});

// In your backend server.js or index.js
app.use((req, res, next) => {
  console.log("Request headers:", req.headers);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    status: 'error', 
    message: 'Something went wrong!' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 News API server running on port ${PORT}`);
  console.log(`📰 Fetch news: GET /api/fetch-news?category=general&country=us`);
  console.log(`📖 Get news: GET /api/get-news?category=general&country=us&page=1&pageSize=9`);
});
