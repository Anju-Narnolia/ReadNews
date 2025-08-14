// api/fetch-news.js
const express = require('express');
const router = express.Router();
const dbConnect = require("../lib/dbConnect");
const News = require("../models/News");

router.get('/', async (req, res) =>{
  try {
    await dbConnect();
    const category = req.query.category || "general";
    const country = req.query.country || "in";

    const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`;
    const response = await fetch(newsApiUrl);
    const data = await response.json();

    if (!data.articles) {
      return res.status(500).json({ success: false, message: "No articles found" });
    }

    // Clear old news for this category and country
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
      category,
      country
    }));

    await News.insertMany(articles);

    res.status(200).json({
      success: true,
      message: "News fetched & stored successfully",
      count: articles.length
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ success: false, error: error.message });
  }
})
;
