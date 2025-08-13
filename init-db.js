require("dotenv").config();
const dbConnect = require("./lib/dbConnect");
const fetch = require("node-fetch");

const categories = ["general", "business", "entertainment", "health", "science", "sports", "technology"];
const country = "us";

async function initializeDatabase() {
  try {
    console.log("🚀 Initializing database with news for all categories...");
    
    await dbConnect();
    
    for (const category of categories) {
      console.log(`📰 Fetching news for ${category}...`);
      
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`
        );
        
        const data = await response.json();
        
        if (data.articles && data.articles.length > 0) {
          // Import the News model
          const News = require("./models/News");
          
          // Clear existing news for this category
          await News.deleteMany({ category, country });
          
          // Save new articles
          const articles = data.articles.map((article) => ({
            title: article.title,
            author: article.author,
            publishedAt: article.publishedAt,
            source: {
              id: article.source.id,
              name: article.source.name
            },
            description: article.description,
            url: article.url,
            urlToImage: article.urlToImage,
            content: article.content,
            category: category,
            country: country
          }));
          
          await News.insertMany(articles);
          console.log(`✅ Stored ${articles.length} articles for ${category}`);
        } else {
          console.log(`⚠️ No articles found for ${category}`);
        }
        
        // Small delay to avoid hitting API rate limits
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`❌ Error fetching news for ${category}:`, error.message);
      }
    }
    
    console.log("🎉 Database initialization completed!");
    process.exit(0);
    
  } catch (error) {
    console.error("❌ Database initialization failed:", error);
    process.exit(1);
  }
}

initializeDatabase();
