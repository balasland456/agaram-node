import UserService from "../service/user-service";
import { NextFunction, Request, Response } from "express";
import { IResetPassword, IUser, ResponseDTO, statusCode } from "../types";

export default class UserController {
  private _user: UserService;

  constructor() {
    this._user = new UserService();
    
    this.adduser = this.adduser.bind(this);
    this.getallusers = this.getallusers.bind(this);
    this.getforgotpasswordlist = this.getforgotpasswordlist.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.exportdata = this.exportdata.bind(this);
    this.getNonAdmin = this.getNonAdmin.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  async adduser(
    request: Request<IUser>,
    response: Response<ResponseDTO<IUser>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IUser>> | void> {
    try {
      const user = request.body;
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

  async updateUser(
    request: Request<IUser>,
    response: Response<ResponseDTO<IUser>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IUser>> | void> {
    try {
      const { _id } = request.params;
      const user: IUser = request.body;
      // saving
      const saved = await this._user.updateUser(
        {
          ...user
        }, _id);

      const responseDTO = new ResponseDTO<IUser>(
        statusCode.OK,
        true,
        saved,
        null
      );

      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }

  async getallusers(
    request: Request,
    response: Response<ResponseDTO<IUser[]>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IUser[]>> | void> {
    try {
      const { sort, page, pageSize } = request.query;
      const pageNumber: number | undefined = page ? +page : undefined;
      const pageSizeNumber: number | undefined = pageSize
        ? +pageSize
        : undefined;
      const alluser = await this._user.getallusers(
        sort as string,
        pageNumber,
        pageSizeNumber
      );
      const responseDTO = new ResponseDTO<IUser[]>(
        statusCode.OK,
        true,
        alluser,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }

  async getforgotpasswordlist(
    request: Request,
    response: Response<ResponseDTO<IUser[]>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IUser[]>> | void> {
    try {
      const { sort, page, pageSize } = request.query;
      const pageNumber: number | undefined = page ? +page : undefined;
      const pageSizeNumber: number | undefined = pageSize
        ? +pageSize
        : undefined;
      const alluser = await this._user.getforgotpasswordlist(
        sort as string,
        pageNumber,
        pageSizeNumber
      );
      const responseDTO = new ResponseDTO<IUser[]>(
        statusCode.OK,
        true,
        alluser,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }

  async resetPassword(
    request: Request<IResetPassword>,
    response: Response<ResponseDTO<IUser>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IUser>> | void> {
    try {
      const user: IResetPassword = request.body;
      // saving
      const saved = await this._user.resetPassword(user);

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

  async exportdata(
    request: Request,
    response: Response<Blob>,
    next: NextFunction
  ): Promise<Response<Blob> | void> {
    try {      
      const data = await this._user.exportdata();
      let filename = "Users";
      response.set({
        "Content-disposition": `attachment; filename=${filename}.xlsx`,
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      return data.xlsx.write(response).then(() => {
        response.status(statusCode.OK).end();
      });
    } catch (error) {
      return next(error);
    }
  }

  async getNonAdmin(
    request: Request,
    response: Response<ResponseDTO<IUser[]>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IUser[]>> | void> {
    try {      
      const alluser = await this._user.getNonAdmin();
      const responseDTO = new ResponseDTO<IUser[]>(
        statusCode.OK,
        true,
        alluser,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }
}
