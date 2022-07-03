import readXlsxFile, { ParsedObjectsResult } from "read-excel-file/node";
import ValidatorError from "../exceptions/validator-error";
import { IUserExcel } from "../types";
import { userExcelSchema } from "../validation-schema/excel-validation/user-excel-validation";

export class ExcelService {
  async read(file: any): Promise<IUserExcel[]> {
    try {
      const jsonData: ParsedObjectsResult<IUserExcel> = await readXlsxFile(file.path, {
        schema: userExcelSchema,
      });
      if (jsonData.errors.length > 0) {
        throw new ValidatorError("Please provide appropriate fields");
      }
      return jsonData.rows;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
