const fetch = require("node-fetch");
const dbConnect = require("../lib/dbConnect");
const News = require("../models/News");

module.exports = async (req, res) => {
  try {
    await dbConnect();
    const category = req.query.category || "general";
    const country = req.query.country || "in";
    
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`, { credentials: "omit" }
    );

    const data = await response.json();
    console.log("Fetched data:", data.articles.length);
    if (!data.articles) {
      return res
        .status(500)
        .json({ success: false, message: "No articles found" });
    }

    // Clear old news for this category and country
    await News.deleteMany({ category, country });

    // Save new articles with proper mapping
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

    // Send success response
    res
      .status(200)
      .json({
        success: true,
        message: "News fetched & stored successfully",
        count: articles.length,
      });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
