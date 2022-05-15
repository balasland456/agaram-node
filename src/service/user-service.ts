import { IUser, UserType } from "../types";
import User from "../models/user";
import bcrypt from "bcrypt";
import ValidatorError from "../exceptions/validator-error";
import { createStartAndEndIndex } from "../utils";

export default class UserService {
  async addUser(user: IUser): Promise<IUser> {
    try {
      // validate user
      const retrievedUser = await User.findOne({
        $or: [
          {
            email: user.email,
          },
          {
            username: user.username,
          },
        ],
      });

      if (retrievedUser) {
        if (retrievedUser.username === user.username) {
          throw new ValidatorError("Username is already in use");
        }
        if (retrievedUser.email === user.email) {
          throw new ValidatorError("Email is already in use");
        }
      }

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
      const getallusers: IUser[] = await User.find({
        type: { $ne: UserType.ADMIN },
      })
        .sort("-createdAt")
        .skip(startIndex)
        .limit(endIndex);
      return getallusers;
    } catch (error) {
      throw error;
    }
  }
}
