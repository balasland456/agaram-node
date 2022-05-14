import validator from "cape-validator";
import express, { RequestHandler, Router } from "express"
import UserController from "../controller/user-controller"
import { auth } from "../middlewares/auth-middleware";
import { getCustomValidationResponse } from "../utils";
import { transactionValidatorSchema } from "../validation-schema/transaction-validation";

const userController = new UserController();

const router: Router = express.Router();

router.post("/add", auth, userController.adduser as unknown as RequestHandler);

export { router as UserRoutes };

