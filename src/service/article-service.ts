import ValidatorError from "../exceptions/validator-error";
import Article from "../models/article";
import User from "../models/user";
import { IArticle, FilterStatus } from "../types";
import { createStartAndEndIndex, getCurrentDate } from "../utils";
import { ExcelService } from "./excel-service";
import excel from 'exceljs';
export default class CreateArticle {
  private _excelService: ExcelService;
  constructor() {
    this._excelService = new ExcelService();
  }
  // Create a new article
  async addArticle(article: IArticle): Promise<IArticle> {
    try {
      const articleObj = new Article(article);
      const savedArticle = await articleObj.save();
      return savedArticle;
    } catch (error) {
      throw error;
    }
  }

  // Get articles
  async getAllArticle(
    sortParam: string,
    page?: number,
    pageSize?: number
  ): Promise<IArticle[]> {
    try {
      const { startIndex, endIndex } = createStartAndEndIndex(page, pageSize);
      const getArticle: IArticle[] = await Article.find()
        .sort("-createdAt")
        .skip(startIndex)
        .limit(endIndex)
        .populate("assignedTo");
      return getArticle;
    } catch (error) {
      throw error;
    }
  }

  // Search
  async searchArticle(
    sd: Date,
    ed: Date,
    status:FilterStatus,
    client:string,    
    page?: number,
    pageSize?: number
  ): Promise<IArticle[]> {

    try {
      const { startIndex, endIndex } = createStartAndEndIndex(page, pageSize);
      let where : any = {};
      if(status!=FilterStatus.ALL){
        where.status = {$eq:status};
      }
      if(client){
        where.client = {$regex: '.*' + client + '.*'};
      }
      const search: IArticle[] = await Article.find({
        createdAt: {
          $gte: getCurrentDate(sd),
          $lte: getCurrentDate(ed),
        },
        ...where
      })
        .sort("-createdAt")
        .skip(startIndex)
        .limit(endIndex);
      return search;
    } catch (error) {
      throw error;
    }
  }

  // delete a article
  async deleteArticle(articleId: string): Promise<IArticle> {
    try {
      const deleted = await Article.findOneAndDelete({ _id: articleId });
      if (!deleted) {
        throw new ValidatorError("article not found");
      }
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  // Update a article
  async updateArticle(article: IArticle, articleId: string): Promise<IArticle> {
    try {
      const update = await Article.findOneAndUpdate(
        { _id: articleId },
        article,
        { runValidators: true }
      );
      if (!update) {
        throw new ValidatorError("Article not found");
      }
      const updated = await Article.findOne({ _id: articleId });
      return updated;
    } catch (error) {
      throw error;
    }
  }


  async exportdata(
    sd: Date,
    ed: Date,
    filter:string,
    status:FilterStatus,
    client:string
  ): Promise<excel.Workbook> {
    try {      
      let where :any= {};
      if(filter =="true"){
        where = {
          createdAt: {
            $gte: getCurrentDate(sd),
            $lte: getCurrentDate(ed),
          },
        }

        if(status!=FilterStatus.ALL){
          where.status = {$eq:status};
        }
        if(client){
          where.client = {$regex: '.*' + client + '.*'};
        }
      }
      const data: IArticle[] = await Article.find(where).sort("-createdAt");

      let columns:any[] = [
        {
          key:"client",
          header:"Client"
        },
        {
          key:"batch",
          header:"Batch"
        },
        {
          header:"Article Type",
          key:"articleTypes",         
        },
        {
          header:"article",
          key:"article"
        },
        {
          header:"Pages",
          key:"pages"
        },
        {
          header:"Process Type",
          key:"processType"
        },
        {
          header:"Assigned To",
          key:"assignedTo"
        },
        {
          header:"Status",
          key:"status"
        },        
        {
          header:"Created Date",
          key:"createdAt",
          formatter: function(value:string,rowNum:number){
            if(rowNum>1){
              if(value){
                let dd = value.split("T")[0];
                let date : Date = new Date(dd)
                if(date.toString() !== "Invalid Date"){
                  return date;
                }              
              }
            }
            return value;
          }
        },
        {
          header:"Last Updated",
          key:"updatedAt",
          formatter: function(value:string,rowNum:number){
            if(rowNum>1){
              if(value){
                let dd = value.split("T")[0];
                let date : Date = new Date(dd)
                if(date.toString() !== "Invalid Date"){
                  return date;
                }              
              }
            }
            return value;
          }
        },
      ];         
      let exportedData = await this._excelService.exportData(columns,data);
      return exportedData;
    } catch (error) {
      throw error;
    }
  }
}
