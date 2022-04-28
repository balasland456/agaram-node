import { Status } from "./enums";

export default interface headingType {
  _id: string;
  articleTypes: string;
  article: string;
  pages: number;
  processType: string;
  status: Status;
  assignedTo: string;
}
