import { IUser } from "../types";
import User from "../models/user-model";
import bcrypt from "bcrypt";

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
}
