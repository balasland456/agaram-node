import { NextFunction, Request, Response } from "express";
import CreateArticle from "../service/article-service";
import IArticle, { ResponseDTO, statusCode } from "../types";

export default class ArticleController {
  private _article: CreateArticle;

  constructor() {
    this._article = new CreateArticle();

    this.addArticle = this.addArticle.bind(this);
    this.getallArticle = this.getallArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this.searchArticle = this.searchArticle.bind(this);
  }

  async addArticle(
    request: Request<IArticle>,
    response: Response<ResponseDTO<IArticle>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IArticle>> | void> {
    try {
      const article: IArticle = request.body;

      request.user?._id;

      // Saving the article
      const savedArticle = await this._article.addArticle(article);

      const responseDTO = new ResponseDTO<IArticle>(
        statusCode.CREATED,
        true,
        savedArticle,
        null
      );

      return response.status(statusCode.CREATED).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }
  async getallArticle(
    request: Request,
    response: Response<ResponseDTO<IArticle[]>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IArticle[]>> | void> {
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
      const responseDTO = new ResponseDTO<IArticle[]>(
        statusCode.OK,
        true,
        allArticle,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }
// Search a article
  async searchArticle(
    request: Request,
    response: Response<ResponseDTO<IArticle[]>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IArticle[]>> | void> {
    try {
      const { sort, page, pageSize, sd, ed } = request.query;
      const pageNumber: number | undefined = page ? +page : undefined;
      const pageSizeNumber: number | undefined = pageSize
        ? +pageSize
        : undefined;
      const searchedArticle = await this._article.searchArticle(
        new Date(sd as string), 
        new Date(ed as string),
        sort as string,
        pageNumber,
        pageSizeNumber
      );
      const responseDTO = new ResponseDTO<IArticle[]>(
        statusCode.OK,
        true,
        searchedArticle,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }

  // Delete a article
  async deleteArticle(
    request: Request<IArticle>,
    response: Response<ResponseDTO<IArticle>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IArticle>> | void> {
    try {
      const { _id } = request.params;
      const deleteArticle = await this._article.deleteArticle(_id);
      const responseDTO = new ResponseDTO<IArticle>(
        statusCode.OK,
        true,
        deleteArticle,
        null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      return next(error);
    }
  }

  // update a article
  async updateArticle(
    request: Request<IArticle>,
    response: Response<ResponseDTO<IArticle>>,
    next: NextFunction
  ): Promise<Response<ResponseDTO<IArticle>> | void> {
    try {
      const { _id } = request.params;
      const article = request.body;

      const updateArticle = await this._article.updateArticle(
        {
          ...article,
        },
        _id
      );

      const responseDTO = new ResponseDTO<IArticle>(
       statusCode.OK,
       true,
       updateArticle,
       null
      );
      return response.status(statusCode.OK).json(responseDTO);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}
