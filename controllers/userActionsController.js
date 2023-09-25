import Article from "../models/article.js";
import Comment from "../models/comment.js";

class userActionsController {
  async addLike(req, res) {
    const { id } = req.params;
    try {
      const record = await Article.findById(id);
      if (!record) {
        return res.status(404).json({ error: "Article not found" });
      }
      const incrLikes = (record.likes || 0) + 1;
      record.likes = incrLikes;
      await record.save();
      res
        .status(200)
        .json({ message: "Like incremented successfully", record });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }

  async addComment(req, res) {
    const { articleId, text } = req.body;
    try {
      const record = new Comment({ articleId, text });
      await record.save();
      return res.status(200).json(record);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error" });
    }
  }

  async getAllComments(req, res) {
    const records = await Comment.find();
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
}

export default new userActionsController();
