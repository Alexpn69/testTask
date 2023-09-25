import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: String,
  tag: { type: mongoose.Schema.Types.ObjectId, ref: "Tag" },
  //для отображения даты статьи использована дата создания ее в БД
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  dislikes: {
    type: Number,
    default: 0,
  },
  //следует добавить ссылку на изображение - это зависит от хранилища изображений, поэтому данный функционал не реализовал
});

const Article = mongoose.model("Article", articleSchema);
export default Article;
