const dbConnect = require("../lib/dbConnect");
const News = require("../models/News");

module.exports = async (req, res) => {
  try {
    await dbConnect();
    const { category = "general", country = "us", page = 1, pageSize = 9 } = req.query;
    
    // Calculate skip value for pagination
    const skip = (parseInt(page) - 1) * parseInt(pageSize);
    
    // Fetch news from MongoDB
    const articles = await News.find({ category, country })
      .sort({ publishedAt: -1 }) // Sort by published date (newest first)
      .skip(skip)
      .limit(parseInt(pageSize));
    
    // Get total count for pagination
    const totalResults = await News.countDocuments({ category, country });
    
    // Check if we need to fetch fresh data from NewsAPI
    if (articles.length === 0) {
      // If no articles in DB, trigger fetch from NewsAPI
      console.log(`No articles found for ${category}, triggering fetch from NewsAPI`);
      // You can implement a webhook or call fetch-news here
      return res.status(200).json({
        status: "ok",
        totalResults: 0,
        articles: [],
        message: "No articles found. Please fetch fresh news first."
      });
    }
    
    // Transform data to match NewsAPI format for frontend compatibility
    const transformedArticles = articles.map(article => ({
      source: article.source,
      author: article.author,
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      content: article.content
    }));
    
    res.status(200).json({
      status: "ok",
      totalResults: totalResults,
      articles: transformedArticles
    });
    
  } catch (error) {
    console.error("Error fetching news from MongoDB:", error);
    res.status(500).json({ 
      status: "error", 
      message: "Failed to fetch news from database",
      error: error.message 
    });
  }
};
