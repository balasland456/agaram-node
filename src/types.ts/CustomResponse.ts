import { StatusCode } from "./enums";

export default class CustomResponse<T> {
    success: boolean;
    data: T | null | undefined;
    errors: any;
    statusCode: StatusCode;
    constructor({
      success,
      data,
      errors,
      statusCode,
    }: {
      success: boolean;
      data?: T | null;
      errors?: any | null;
      statusCode: StatusCode;
    }) {
      this.success = success;
      this.data = data;
      this.errors = errors;
      this.statusCode = statusCode;
    }
  }
  