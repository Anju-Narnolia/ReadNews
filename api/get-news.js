const express = require('express');
const router = express.Router();
const dbConnect = require('../lib/dbConnect');
const News = require('../models/News');

router.get('/', async (req, res) => {
  try {
    await dbConnect();
    const { category = 'general', country = 'us', page = 1, pageSize = 9 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(pageSize);

    const articles = await News.find({ category, country })
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(pageSize));

    const totalResults = await News.countDocuments({ category, country });

    if (articles.length === 0) {
      return res.status(200).json({
        status: 'ok',
        totalResults: 0,
        articles: [],
        message: 'No articles found. Please fetch fresh news first.'
      });
    }

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
      status: 'ok',
      totalResults,
      articles: transformedArticles
    });
  } catch (error) {
    console.error('Error fetching news from MongoDB:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch news from database',
      error: error.message
    });
  }
});

module.exports = router;
