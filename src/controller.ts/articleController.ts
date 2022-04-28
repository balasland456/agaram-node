import { NextFunction, Request, Response } from "express";
import CreateArticle from "../service.ts/articleService";
import CustomResponse from "../types.ts/CustomResponse";
import { StatusCode } from "../types.ts/enums";
import headingTypes from "../types.ts/headingTypes";

export default class articleController {
  private _article: CreateArticle;

  constructor() {
    this._article = new CreateArticle();

    this.addArticle = this.addArticle.bind(this);
    this.getallArticle = this.getallArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
  }

  async addArticle(
    request: Request<headingTypes>,
    response: Response<CustomResponse<headingTypes>>,
    next: NextFunction
  ): Promise<Response<CustomResponse<headingTypes>> | void> {
    try {
      const article: headingTypes = request.body;

      // Saving the article
      const savedArticle = await this._article.addArticle(article);

      const customResponse = new CustomResponse<headingTypes>({
        data: savedArticle,
        statusCode: StatusCode.CREATED,
        errors: null,
        success: true,
      });

      return response.status(StatusCode.CREATED).json(customResponse);
    } catch (error) {
      return next(error);
    }
  }
  async getallArticle(
    request: Request,
    response: Response<CustomResponse<headingTypes[]>>,
    next: NextFunction
  ): Promise<Response<CustomResponse<headingTypes[]>> | void> {
    try {
      const { sort, page, pageSize } = request.query;
      const pageNumber: number | undefined = page ? +page : undefined;
      const pageSizeNumber: number | undefined = pageSize
        ? +pageSize
        : undefined;
      const allArticle = await this._article.getAllArticle(
        sort as string,
        pageNumber,
        pageSizeNumber
      );
      const customResponse = new CustomResponse<headingTypes[]>({
        data: allArticle,
        statusCode: StatusCode.OK,
        errors: null,
        success: true,
      });
      return response.status(StatusCode.OK).json(customResponse);
    } catch (error) {
      console.log(error);
    }
  }

  // Delete a article
  async deleteArticle(
    request: Request<headingTypes>,
    response: Response<CustomResponse<headingTypes>>,
    next: NextFunction
  ): Promise<Response<CustomResponse<headingTypes>> | void> {
    try {
      const { _id } = request.params;
      const deleteArticle = await this._article.deleteArticle(_id);
      const customResponse = new CustomResponse<headingTypes>({
        data: deleteArticle,
        statusCode: StatusCode.OK,
        errors: null,
        success: true,
      });
      return response.status(StatusCode.OK).json(customResponse);
    } catch (error) {
      return next(error);
    }
  }

  // update a article
  async updateArticle(
    request: Request<headingTypes>,
    response: Response<CustomResponse<headingTypes>>,
    next: NextFunction
  ): Promise<Response<CustomResponse<headingTypes>> | void> {
    try {
      const { _id } = request.params;
      const article = request.body;

      const updateArticle = await this._article.updateArticle(
        {
          ...article,
        },
        _id
      );

      const customResponse = new CustomResponse<headingTypes>({
        data: updateArticle,
        statusCode: StatusCode.OK,
        errors: null,
        success: true,
      });
      return response.status(StatusCode.OK).json(customResponse);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}
