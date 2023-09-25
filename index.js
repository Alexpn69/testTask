import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./router.js";
import dotenv from "dotenv";
dotenv.config();

/*
В данной архитектуре необходимо реализовать систему авторизации для юзеров и админа и
реализовать систему доступов к различным енд-пойнтам в зависимости от ролей
сейчас это не реализовано и все роуты общедоступны, если у вас будет заинтересованность в реализации 
системы авторизации - мы можем обсудить это
*/

const url = `mongodb+srv://${process.env.LOGIN_MONGO}:${process.env.PASS_MONGO}@cluster0.vmfxm3k.mongodb.net/?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
await mongoose
  .connect(url, { useNewUrlParser: true }, { useUnifiedTopology: true })
  .then((res) => console.log("Connected to Mongo"))
  .catch((err) => console.log("Error of connection to Mongo"));

const app = express();
//в рамках тестового задания CORS не настраивал
app.use(cors());
app.use(express.json());
app.use("/api", router);

const PORT = process.env.PORT || 3003;
const main = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
main();
