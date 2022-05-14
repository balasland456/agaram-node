import { NextFunction, Request, Response } from "express";
import jwt, { TokenExpiredError } from "jsonwebtoken";
import UnAuthenticatedError from "../exceptions/unathenticated-error";
import User from "../models/user-model";
import { ITokenPayload, statusCode, tokens } from "../types";

export const checkRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const refreshToken = req.cookies["refresh_token"];
    if (!refreshToken) {
      throw new UnAuthenticatedError("Token not found");
    }
    const decodedValue: ITokenPayload = jwt.verify(
      refreshToken,
      process.env.SECRET!
    ) as ITokenPayload;
    if (decodedValue.type === tokens.access) {
      throw new UnAuthenticatedError("access token found.");
    }
    // check user
    const user = await User.findOne({ email: decodedValue.email });
    if (!user) {
      throw new UnAuthenticatedError("Token not valid");
    }
    req.userEmail = decodedValue.email;
    return next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      error.name = statusCode.REFRESH_TOKEN_EXPIRED.toString();
    }
    return next(error);
  }
};
