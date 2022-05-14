import UserService from "../service/user-service";
import { NextFunction, Request, Response } from "express";
import { IUser, ResponseDTO, statusCode } from "../types";

export default class UserController {
  private _user: UserService;

  constructor() {
    this._user = new UserService();
    this.adduser = this.adduser.bind(this);
  }

  async adduser(
    request: Request<IUser>,
    response: Response<ResponseDTO<IUser>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IUser>> | void> {
    try {
      const user: IUser = request.body;
      // saving
      const saved = await this._user.addUser(user);

      const responseDTO = new ResponseDTO<IUser>(
        statusCode.CREATED,
        true,
        saved,
        null
      );

      return response.status(statusCode.CREATED).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }
}
