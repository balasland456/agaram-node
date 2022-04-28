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
  