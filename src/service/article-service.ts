import { IUser, PagedData } from './../types';
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
  async validateArticle(article: IArticle): Promise<boolean> {
    const findlst = await Article.find({
      client:article.client,
      processType:article.processType,
      assignedTo:article.assignedTo,
      article:article.article,
      _id:{$ne:article._id}
    });
    
    if(findlst && findlst.length>0){
      if(findlst[0]._id == article._id){
        return true;
      }
      return false;
    }
    return true;
  }
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
    pageSize?: number,
    userId?:string,
  ): Promise<PagedData<IArticle>> {
    try {
      const { startIndex, endIndex } = createStartAndEndIndex(page, pageSize);
      let where = {};
      if(userId && userId !="0"){
        where = {assignedTo:userId};
      }
      const getArticle: IArticle[] = await Article.find(where)
        .sort("-createdAt")
        .skip(startIndex)
        .limit(endIndex)
        .populate("assignedTo");

        const rdata :PagedData<IArticle>={
          data : getArticle,
          totalRows:await Article.countDocuments(where)
        };        
      return rdata;
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
    batch:string,
    userId:string,
    page?: number,
    pageSize?: number,    
  ): Promise<IArticle[]> {

    try {
      const { startIndex, endIndex } = createStartAndEndIndex(page, pageSize);
      let where : any = {};

      if(userId && userId !="0" ){
        where = {assignedTo:userId};
      }      
      if(status!=FilterStatus.ALL){
        where.status = {$eq:status};
      }
      if(client){
        where.client = {$regex: '.*' + client + '.*'};
      }
      if(batch){
        where.batch = {$regex: '.*' + batch + '.*'};
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
    client:string,
    batch:string,    
    userId?:string,
  ): Promise<excel.Workbook> {
    try {      
      let where :any= {};
      if(userId && userId !="0"){
        where = {assignedTo:userId};
      }
      if(filter =="true"){
        where.createdAt= {
            $gte: getCurrentDate(sd),
            $lte: getCurrentDate(ed),
          }

        if(status!=FilterStatus.ALL){
          where.status = {$eq:status};
        }
        if(client){
          where.client = {$regex: '.*' + client + '.*'};
        }
        if(batch){
          where.batch = {$regex: '.*' + batch + '.*'};
        }
      }
      
      const data: any[] = await Article.find(where).populate({path:"assignedTo"}).sort("-createdAt");
      
      let columns:any[] = [        
        {
          key:"client",
          header:"Client"
        },
        {
          key:"batch",
          header:"Batch/JOB ID"
        },        
        {
          header:"Article/ISBN",
          key:"article"
        },
        {
          header:"Pages",
          key:"pages"
        },
        {
          header:"Input Type",
          key:"inputType"
        },
        {
          header:"Complexity",
          key:"complexity"
        },
        {
          header:"Process Type",
          key:"processType"
        },
        {
          header:"Math Count",
          key:"mathCount"
        },
        {
          header:"Images Count",
          key:"imagesCount"
        },        
        {
          header:"Assigned To",
          key:"assignedTo",
          formatter: function(value:string,rowNum:number){
            if(rowNum>1){
              let usr:any = value;
              if(typeof usr=="string"){
                usr=JSON.parse(usr);
              }
              if(usr){
                return usr.employeeId;
              }                
              return "";
            }
            return value;
          }
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
        
        // {
        //   header:"Last Updated",
        //   key:"updatedAt",
        //   formatter: function(value:string,rowNum:number){
        //     if(rowNum>1){
        //       if(value){
        //         let dd = value.split("T")[0];
        //         let date : Date = new Date(dd)
        //         if(date.toString() !== "Invalid Date"){
        //           return date;
        //         }              
        //       }
        //     }
        //     return value;
        //   }
        // },
        {
          header:"Completed Date",
          key:"completedDate",
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
        // {
        //   header:"Closed Date",
        //   key:"closedDate",
        //   formatter: function(value:string,rowNum:number){
        //     if(rowNum>1){
        //       if(value){
        //         let dd = value.split("T")[0];
        //         let date : Date = new Date(dd)
        //         if(date.toString() !== "Invalid Date"){
        //           return date;
        //         }              
        //       }
        //     }
        //     return value;
        //   }
        // },
      ];    
      if(userId && userId !="0"){
        columns.splice(0,1);
      }     
      let exportedData = await this._excelService.exportData(columns,data);
      return exportedData;
    } catch (error) {
      throw error;
    }
  }

  async getArticleByUniqueFields(article: IArticle): Promise<IArticle|null> {
    try {
      const findlst = await Article.find({
        client:article.client,
        processType:article.processType,
        assignedTo:article.assignedTo,
        article:article.article,
        _id:{$ne:article._id}
      });
      if(findlst && findlst.length>0){
        return findlst[0];
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}
