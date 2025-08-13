# ReadNews - MongoDB-Based News Application

A modern React-based news application that stores news articles in MongoDB and serves them through a custom API, providing faster access and avoiding NewsAPI rate limits.

## 🚀 Features

- **MongoDB Storage**: News articles are stored locally in MongoDB for fast access
- **Category-based Navigation**: 7 news categories (General, Business, Entertainment, Health, Science, Sports, Technology)
- **Infinite Scrolling**: Smooth pagination with infinite scroll
- **Responsive Design**: Bootstrap-based responsive layout
- **Real-time Updates**: Automatic news fetching when database is empty
- **Progress Indicators**: Loading bars and spinners for better UX

## 🏗️ Architecture

- **Frontend**: React 18 with Bootstrap 5
- **Backend**: Express.js API server
- **Database**: MongoDB with Mongoose ODM
- **News Source**: NewsAPI.org (fetched and stored locally)

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB running locally or MongoDB Atlas connection
- NewsAPI.org API key

## 🛠️ Setup

1. **Clone and Install Dependencies**
   ```bash
   git clone <your-repo>
   cd ReadNews
   npm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/newsapp
   NEWS_API_KEY=your_news_api_key_here
   PORT=5000
   ```

3. **Initialize Database**
   ```bash
   npm run init-db
   ```
   This will fetch news for all categories and store them in MongoDB.

4. **Start the Application**
   ```bash
   # Start both API server and React app
   npm run dev
   
   # Or start them separately:
   npm run server    # API server on port 5000
   npm start         # React app on port 3000
   ```

## 🔌 API Endpoints

- `GET /api/fetch-news?category=general&country=us` - Fetch fresh news from NewsAPI and store in MongoDB
- `GET /api/get-news?category=general&country=us&page=1&pageSize=9` - Get stored news from MongoDB
- `GET /api/health` - Health check endpoint

## 📱 Available Scripts

- `npm start` - Start React development server
- `npm run server` - Start Express API server
- `npm run dev` - Start both servers concurrently
- `npm run init-db` - Initialize database with news for all categories
- `npm run build` - Build for production
- `npm test` - Run tests

## 🔄 How It Works

1. **First Visit**: App checks MongoDB for news, if empty, fetches from NewsAPI and stores
2. **Subsequent Visits**: News is served directly from MongoDB (fast, no API limits)
3. **Automatic Refresh**: When no news is found, fresh news is automatically fetched
4. **Infinite Scroll**: Pagination is handled through MongoDB queries

## 🚀 Deployment

The app is configured for Netlify deployment with:
- Build command: `npm run build`
- Publish directory: `build`
- SPA routing support

## 🛡️ Security Notes

- NewsAPI key is stored in environment variables
- MongoDB connection string should be kept secure
- Consider implementing rate limiting for production use

## 📊 Performance Benefits

- **Faster Loading**: News served from local database
- **No Rate Limits**: Avoid NewsAPI request limits
- **Offline Capability**: News available even when NewsAPI is down
- **Reduced API Calls**: Only fetch when database is empty

## 🔧 Troubleshooting

- **MongoDB Connection**: Ensure MongoDB is running and connection string is correct
- **API Key**: Verify NewsAPI key is valid and has sufficient quota
- **Port Conflicts**: Check if ports 3000 and 5000 are available

## 📝 License

This project is licensed under the MIT License.

