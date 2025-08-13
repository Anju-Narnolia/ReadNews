const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  author: String,
  publishedAt: String,
  source: {
    id: String,
    name: String
  },
  description: String,
  url: String,
  urlToImage: String,
  content: String,
  category: String,
  country: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.models.News || mongoose.model("News", newsSchema);
