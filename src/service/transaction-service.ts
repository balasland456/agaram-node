import ValidatorError from "../exceptions/validator-error";
import Transaction from "../models/transaction";
import { ITransaction } from "../types";
import { createStartAndEndIndex, getCurrentDate } from "../utils";

export default class Savetransaction {
  // add transaction
  async addtransaction(transaction: ITransaction): Promise<ITransaction> {
    try {
      transaction.date = new Date(getCurrentDate(transaction.date));
      const transactionObj = new Transaction(transaction);
      const savedtransaction = await transactionObj.save();
      return savedtransaction;
    } catch (error) {
      throw error;  
    }
  }

  // get all transactions

  async gettransactions(
    sortParam: string,
    page?: number,
    pageSize?: number
  ): Promise<ITransaction[]> {
    try {
      const { startIndex, endIndex } = createStartAndEndIndex(page, pageSize);
      const gettransaction: ITransaction[] = await Transaction.find()
        .sort("-createdAt")
        .skip(startIndex)
        .limit(endIndex);
      return gettransaction;
    } catch (error) {
      throw error;
    }
  }

  // Search
  async searchtransaction(
    sd: Date,
    ed: Date,
    sortParam: string,
    page?: number,
    pageSize?: number
  ): Promise<ITransaction[]> {
    try {
      const { startIndex, endIndex } = createStartAndEndIndex(page, pageSize);
      const search: ITransaction[] = await Transaction.find({
        date: {
          $gte: sd,
          $lte: ed,
        },
      })
        .sort("-createdAt")
        .skip(startIndex)
        .limit(endIndex);
      return search;
    } catch (error) {
      throw error;
    }
  }

  // Delete transaction
  async deletetransaction(transactionId: string): Promise<ITransaction> {
    try {
      const deleted = await Transaction.findOneAndDelete({
        _id: transactionId,
      });
      if (!deleted) {
        throw new ValidatorError("Transactiion not found");
      }
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  // Update transaction

  async updatetransaction(
    transaction: ITransaction,
    transactionId: string
  ): Promise<ITransaction> {
    try {
      const update = await Transaction.findOneAndUpdate(
        { _id: transactionId },
        transaction
      );
      if (!update) {
        throw new ValidatorError("Transaction not found");
      }
      const updated = await Transaction.findOne({ _id: transactionId });
      return updated;
    } catch (error) {
      throw error;
    }
  }
}
