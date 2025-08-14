const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-app-name.onrender.com'] // Replace with your actual Render URL
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
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

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

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
