import validator from "cape-validator";
import express, { RequestHandler, Router } from "express"
import UserController from "../controller/user-controller"
import { auth } from "../middlewares/auth-middleware";
import { getCustomValidationResponse } from "../utils";
import { userValidatorSchema } from "../validation-schema/user-validation";


const userController = new UserController();

const router: Router = express.Router();

router.post("/add", auth, validator(userValidatorSchema, {customResponse: getCustomValidationResponse(),key: "error"}) , userController.adduser as unknown as RequestHandler);
router.get("/getall", auth, userController.getallusers);
export { router as UserRoutes };

