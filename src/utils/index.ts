import CustomResponse from "../types.ts/CustomResponse";

export const createStartAndEndIndex = (
    page?: number,
    pageSize?: number
  ): { startIndex: number; endIndex: number } => {
    if (!page || !pageSize) {
      return { startIndex: 0, endIndex: 10 };
    }
    const startIndex = (page * pageSize) - pageSize;
    return { startIndex: startIndex, endIndex: pageSize };
  };

  export const getCustomValidationResponse = (): CustomResponse<null> => {
    return new CustomResponse({ success: false, errors: null, statusCode: 400, data: null });
  };
  