import { Router } from "express";
import articleController from "./controllers/articleController.js";
import userActionsController from "./controllers/userActionsController.js";
import tagController from "./controllers/tagController.js";
import helperController from "./controllers/helperController.js";
const router = new Router();

/*TAG
по этому энд-пойнту получаем все теги и строим исходя из них меню навигации на сайд-баре на клиенте
можно сортировать нужные теги и выводить в меню только их либо сделать функцию Delete и удалять не актуальные тэги
также есть роут для добавления новых тегов
*/
router.get("/tags", tagController.getAllTags);
router.post("/tags", tagController.createTag);

/*Article
1) можем получить все статьи по тэгу (например для отображения всех статей с тегом Спорт при переходе в меню навигации)
2) получить статью по ID (при переходе "внутрь" статьи - можно предусмотреть доп функционал)  
3) создаем новую статью
4) служебная функция которая возвращает список всех статей
*/
router.get("/articles/tag/:tag", articleController.getArticlesByTag);
router.get("/articles/:id", articleController.getArticleById);
router.post("/articles", articleController.createArticle);
router.get("/articles", articleController.getAllArticles);

/*
Данный роут предназначен для функций, которые могут вызвать авторизованные юзеры: ставить Лайки/дизлайки,
добавлять комментарии, добавлять в избранное...
*/
router.put("/articles/options/:id", userActionsController.addLike); //функция дизлайка пишется по аналогии
router.post("/comments", userActionsController.addComment);
router.get("/comments", userActionsController.getAllComments);

/*
Это роут предназначен для прочих служебных функций, в частности здесь мы получаем со стороннего api
данные о курсах валют и передаем их на клиента
*/
router.get("/currencyFeed", helperController.getCurrencyFeed);

export default router;
