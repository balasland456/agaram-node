import validator from "cape-validator";
import express, { RequestHandler, Router } from "express";

// our import

import ArticleController from "../controller.ts/articleController";
import { getCustomValidationResponse } from "../utils";
import { articleValidatorSchema } from "../validation-schema/articleValidators";

const articleController = new ArticleController();

const router: Router = express.Router();

router.post("/add", validator(articleValidatorSchema, {customResponse: getCustomValidationResponse(),key: "errors"}), articleController.addArticle as unknown as RequestHandler);
router.get("/getall", articleController.getallArticle);
router.delete("/delete/:_id", articleController.deleteArticle);
router.put("/update/:_id",  validator(articleValidatorSchema, {customResponse: getCustomValidationResponse(),key: "errors"}), articleController.updateArticle as unknown as RequestHandler);

export default router;
