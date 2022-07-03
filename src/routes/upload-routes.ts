import express, { RequestHandler } from "express";
import multer from "multer";
import { UploadController } from "../controller/upload-controller";

const router = express.Router();

const uploadController = new UploadController();

// routes
router.post("",  multer({ dest: "uploads/" }).single("upload") ,uploadController.upload);

export { router as uploadRouter };
