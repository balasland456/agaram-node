import { ResponseDTO, statusCode } from "../types";

export const createStartAndEndIndex = (
  page?: number,
  pageSize?: number
): { startIndex: number; endIndex: number } => {
  if (!page || !pageSize) {
    return { startIndex: 0, endIndex: 10 };
  }
  const startIndex = page * pageSize - pageSize;
  return { startIndex: startIndex, endIndex: pageSize };
};

export const getCustomValidationResponse = (): ResponseDTO<null> => {
  return new ResponseDTO(statusCode.BAD_REQUEST, false, null, null);
};
