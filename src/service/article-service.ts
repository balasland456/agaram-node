import ValidatorError from "../exceptions/validator-error";
import Article from "../models/article";
import { IArticle } from "../types";
import { createStartAndEndIndex } from "../utils";

export default class CreateArticle {
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
        .sort("-updatedAt")
        .skip(startIndex)
        .limit(endIndex);
      return getArticle;
    } catch (error) {
      throw error;
    }
  }

  // Search
  async searchArticle(
    sd: Date,
    ed: Date,
    sortParam: string,
    page?: number,
    pageSize?: number
  ): Promise<IArticle[]> {
    try {
      const { startIndex, endIndex } = createStartAndEndIndex(page, pageSize);
      const search: IArticle[] = await Article.find({
        createdAt: {
          $gt: sd,
          $lt: ed,
        },
      })
        .sort("-updatedAt")
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
        { status: article.status },
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
}
