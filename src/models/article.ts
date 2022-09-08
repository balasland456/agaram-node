import mongoose from "mongoose";
import { getCurrentDate } from "../utils";

const articleSchema = new mongoose.Schema(
  {
    // articleTypes: {
    //   type: String,
    //   required: true,
    // },
    article: {
      type: String,
      required: true,
    },
    // datefield: {
    //   type: Date,
    //   required: true,
    // },
    pages: {
      type: Number,
      required: true,
    },
    inputType: {
      type: String,
      required: true,
      enum: ["PDF PRINTED", "PDF SCANNED"],
      default: "PDF PRINTED"
    },
    complexity: {
      type: String,
      required: true,
      enum: ["SIMPLE", "MEDIUM", "COMPLEX", "HCOMPLEX"],
      default: "SIMPLE"
    },
    processType: {
      type: String,
      required: true,
      enum: ["OCR", "CODING", "IMAGES", "REF", "QA","E2E"],
      default: "OCR"
    },
    mathCount: {
      type: String,
      required: true,
    },
    imagesCount: {
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
    closedDate: {
      type: Date,      
    },
    completedDate: {
      type: Date,
    },
    createdBy:{
      type: String,
      ref: "User"
    },
    IsCreatedByMe:{
      type:Boolean
    },
  },
  { timestamps: { updatedAt: true, createdAt: false } }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
