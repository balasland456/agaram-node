import mongoose from "mongoose";

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
    pages: {
      type: Number,
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
      required: true,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
