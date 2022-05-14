import validator from "cape-validator";
import express, { RequestHandler, Router } from "express";
import ArticleController from "../controller/article-controller";

// our import
import { getCustomValidationResponse } from "../utils";
import { articleValidatorSchema } from "../validation-schema/article-validation";

const articleController = new ArticleController();

const router: Router = express.Router();

router.post("/add", validator(articleValidatorSchema, {customResponse: getCustomValidationResponse(),key: "error"}), articleController.addArticle as unknown as RequestHandler);
router.get("/getall", articleController.getallArticle);
router.delete("/delete/:_id", articleController.deleteArticle);
router.put("/update/:_id",  validator(articleValidatorSchema, {customResponse: getCustomValidationResponse(),key: "error"}), articleController.updateArticle as unknown as RequestHandler);

export { router as ArticleRouter };
