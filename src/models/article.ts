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
    },
    client: {
      type: String,
    },
    batch: {
      type: String,
    }
  },
  { timestamps: true }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
