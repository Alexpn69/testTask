import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  /*userID: здесь имеет смысл указать ссылку на user, который добавил комментарий
  сейчас этого не сделано тк нет системы авторизации и соот-х моделей
  */
  articleId: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  text: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
