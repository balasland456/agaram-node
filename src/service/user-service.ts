import { IUser } from "../types";
import User from "../models/user-model";
import bcrypt from "bcrypt";
import { createStartAndEndIndex } from "../utils";

export default class UserService {
  async addUser(user: IUser): Promise<IUser> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 6);
      user.password = hashedPassword;
      const userObj = new User(user);
      const saveduser = await userObj.save();
      return saveduser;
    } catch (error) {
      throw error;
    }
  }

  async getallusers(
    sortParam: string,
    page?: number,
    pageSize?: number
  ): Promise<IUser[]> {
    try {
      const { startIndex, endIndex } = createStartAndEndIndex(page, pageSize);
      const getallusers: IUser[] = await User.find()
        .sort("-updatedAt")
        .skip(startIndex)
        .limit(endIndex);
      return getallusers;
    } catch (error) {
      throw error;
    }
  }
}
