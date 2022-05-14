import ValidatorError from "../exceptions/validator-error";
import User from "../models/user-model";
import { IUser } from "../types";
import bcrypt from "bcrypt";

export class AuthService {
  async findUserByUsername(username: string): Promise<IUser> {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        throw new ValidatorError("Email or password is invalid");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  async comparePassword(
    hashedPassword: string,
    password: string
  ): Promise<boolean> {
    try {
      const isPasswordMatch = await bcrypt.compare(password, hashedPassword);
      if (!isPasswordMatch) {
        throw new ValidatorError("Email or password is invalid");
      }
      return true;
    } catch (error) {
      throw error;
    }
  }
}
