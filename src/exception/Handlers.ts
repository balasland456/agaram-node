import { NextFunction, Response } from "express";
import CustomResponse from "../types.ts/CustomResponse";
import { StatusCode } from "../types.ts/enums";
import ValidatorError from "./ValidatorErrors";

export default class Handler {
 
  static handleError(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
  ): Response<CustomResponse<null>> {
    const customResponse = new CustomResponse({
      data: null,
      success: false,
      errors: error.message,
      statusCode: StatusCode.BAD_REQUEST,
    });
    if (error instanceof ValidatorError) {
      customResponse.statusCode = StatusCode.BAD_REQUEST;
      return response.status(StatusCode.BAD_REQUEST).json(customResponse);
    } else {
      customResponse.statusCode = StatusCode.INTERNAL_SERVER_ERROR;
      return response
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json(customResponse);
    }
  }
}
