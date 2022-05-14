export interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  createdAt: Date;
  type: UserType;
  updatedAt: Date;
}

export enum UserType {
  ADMIN = "ADMIN",
  NON_ADMIN = "NON_ADMIN",
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface ITokenPayload {
  email: string;
  type: tokens;
}

export enum tokens {
  access = "access",
  refresh = "refresh",
}

export class ResponseDTO<T> {
  statusCode: number;
  success: boolean;
  data: T | null;
  error: string | [] | null;

  constructor(
    statusCode: number,
    success: boolean,
    data: T | null,
    error: string | [] | null
  ) {
    this.statusCode = statusCode;
    this.success = success;
    this.data = data;
    this.error = error;
  }
}

export enum statusCode {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
  UNAUTHENTICATED = 401,
  REFRESH_TOKEN_EXPIRED = 403,
}

declare global {
  namespace Express {
    interface Request {
      userEmail?: string;
      user?: IUser;
    }
  }
}
