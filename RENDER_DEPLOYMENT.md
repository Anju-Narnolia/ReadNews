# 🚀 Render Deployment Guide

## Prerequisites
- Render account (free at render.com)
- GitHub repository with your code
- MongoDB Atlas database (already configured)
- NewsAPI key (already configured)

## Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

## Step 2: Deploy on Render

### Option A: Using Render Dashboard (Recommended)
1. **Go to [render.com](https://render.com) and sign up/login**
2. **Click "New +" → "Web Service"**
3. **Connect your GitHub repository**
4. **Configure the service:**
   - **Name**: `newsapp` (or any name you prefer)
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

### Option B: Using render.yaml (Auto-deploy)
1. **Push the `render.yaml` file to your repo**
2. **Render will automatically detect and deploy**

## Step 3: Set Environment Variables
In your Render dashboard, go to your service → Environment → Add:

```
MONGODB_URI = mongodb+srv://anjunarnolia93750:qWiLjs3f1uHi62aK@clusterone.tqaod8i.mongodb.net/newsapp
NEWS_API_KEY = 8488cb778da840eab79d8d2e64caaf03
NODE_ENV = production
```

## Step 4: Deploy
Click "Create Web Service" and wait for deployment (5-10 minutes).

## Step 5: Initialize Database
After deployment, visit:
```
https://your-app-name.onrender.com/api/fetch-news?category=general&country=us
```

## How It Works on Render
- **Frontend**: React app built and served by Express
- **Backend**: Express API with MongoDB Atlas
- **Database**: Your existing MongoDB Atlas database
- **Deployment**: Automatic from GitHub

## Benefits of Render
- ✅ **Free tier** available
- ✅ **Automatic deployments** from Git
- ✅ **Custom domains** support
- ✅ **SSL certificates** included
- ✅ **Node.js support** (perfect for your app)
- ✅ **Easy environment variable** management

## Troubleshooting
- **Build fails**: Check if all dependencies are in `dependencies` (not `devDependencies`)
- **Database connection**: Verify MongoDB Atlas connection string
- **API errors**: Check Render logs in the dashboard
- **CORS issues**: Update CORS origin in server.js with your actual Render URL

## Update CORS After Deployment
After getting your Render URL, update `server.js`:
```javascript
origin: process.env.NODE_ENV === 'production' 
  ? ['https://your-actual-app-name.onrender.com']
  : ['http://localhost:3000']
```

## Local Development
```bash
npm run dev  # Runs both React and API server
npm start    # Runs only API server
npm run build # Builds React for production
```
