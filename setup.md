# Setup Guide for MongoDB News App

## Environment Variables
Create a `.env` file in the root directory with:

```
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/newsapp

# NewsAPI Key
NEWS_API_KEY=8488cb778da840eab79d8d2e64caaf03

# Server Port
PORT=5000
```

## Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start MongoDB**
   Make sure MongoDB is running on your system

3. **Start the API Server**
   ```bash
   npm run server
   ```

4. **Start the React App** (in another terminal)
   ```bash
   npm start
   ```

5. **Or run both together**
   ```bash
   npm run dev
   ```

## API Endpoints

- **Fetch fresh news**: `GET /api/fetch-news?category=general&country=us`
- **Get stored news**: `GET /api/get-news?category=general&country=us&page=1&pageSize=9`
- **Health check**: `GET /api/health`

## How it works now

1. App first tries to fetch news from MongoDB
2. If no news found, it automatically fetches from NewsAPI and stores in MongoDB
3. All subsequent requests come from MongoDB (faster, no API limits)
4. News is automatically refreshed when needed
