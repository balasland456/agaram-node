import mongoose from "mongoose";
import { getCurrentDate } from "../utils";

const articleSchema = new mongoose.Schema(
  {
    articleTypes: {
      type: String,
      required: true,
    },
    article: {
      type: String,
      required: true,
    },
    datefield: {
      type: Date,
      required: true,
    },
    pages: {
      type: Number,
      required: true,
    },
    processType: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["ASSIGNED", "UNASSIGNED", "CLOSED", "REJECTED", "COMPLETED"],
      default: "UNASSIGNED"
    },
    assignedTo: {
      type: String,
      ref: "User"
    },
    client: {
      type: String,
    },
    batch: {
      type: String,
    },
    createdAt: {
      type: Date,
      required: true,
      default: new Date(getCurrentDate()),
    },
  },
  { timestamps: { updatedAt: true, createdAt: false } }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
