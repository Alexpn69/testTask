//import jwt from "jsonwebtoken";
import Article from "../models/article.js";
import Comment from "../models/comment.js";
import Tag from "../models/tag.js";

class articleController {
  async getAllArticles(req, res) {
    const records = await Article.find();
    try {
      if (!records || records.length == 0) {
        return res.status(404).send({ error: "No results found" });
      }
      return res.status(200).json(records);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async getArticleById(req, res) {
    const { id } = req.params;
    try {
      const [article, comments] = await Promise.all([
        Article.findById(id),
        Comment.find({ articleId: id }),
      ]);
      if (!article) {
        return res.status(404).json({ error: "Article not found" });
      }
      return res.status(200).json({ article, comments });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }

  async getArticlesByTag(req, res) {
    const { tag } = req.params;
    try {
      const articles = await Article.find({ tag });
      if (!articles) {
        return res.status(404).json({ error: "Articles not found" });
      }
      res.status(200).json(articles);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }

  async createArticle(req, res) {
    const { title, content, tag } = req.body;
    if (!title || !content) {
      return res
        .status(403)
        .send({ error: "You need to send both the title and the content" });
    }
    try {
      const record = new Article({ title, content, tag });
      await record.save();
      return res.status(200).json(record);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Server error" });
    }
  }
}
export default new articleController();
