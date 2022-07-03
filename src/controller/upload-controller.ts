import { NextFunction, Request, Response } from "express";
import ValidatorError from "../exceptions/validator-error";
import UploadService from "../service/upload-service";
import { ResponseDTO } from "../types";

export class UploadController {
  private _uploadService: UploadService;

  constructor() {
    this._uploadService = new UploadService();

    //bind
    this.upload = this.upload.bind(this);
  }

  async upload(
    req: Request,
    res: Response<ResponseDTO<string>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<string>> | void> {
    try {
      const file = req.file;
      const { type } = req.body;

      if (!file || !type) {
        throw new ValidatorError("Please, send the required fields");
      }

      const data = await this._uploadService.upload(type, file);
      const response = new ResponseDTO(200, true, "OK", null);
      return res.status(200).json(response);
    } catch (error) {
      return next(error);
    }
  }
}
