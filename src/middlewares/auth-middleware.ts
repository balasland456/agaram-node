import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UnAuthenticatedError from "../exceptions/unathenticated-error";
import User from "../models/user-model";
import { ITokenPayload, tokens } from "../types";

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies["access_token"];
    if (!accessToken) {
      throw new UnAuthenticatedError("Token not found");
    }
    const decodedValue: ITokenPayload = jwt.verify(
      accessToken,
      process.env.SECRET!
    ) as ITokenPayload;
    if (decodedValue.type === tokens.refresh) {
      throw new UnAuthenticatedError("Refresh token found.");
    }

    // check user
    const user = await User.findOne({ email: decodedValue.email });
    if (!user) {
      throw new UnAuthenticatedError("Token not valid");
    }
    req.userEmail = decodedValue.email;
    req.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};
