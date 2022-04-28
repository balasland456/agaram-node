import express, { Router } from "express";

// our import

import ArticleController from "../controller.ts/articleController";

const articleController = new ArticleController();

const router: Router = express.Router();

router.post("/add", articleController.addArticle);
router.get("/getall", articleController.getallArticle);
router.delete("/delete/:_id", articleController.deleteArticle);
router.put("/update/:_id", articleController.updateArticle);

export default router;
