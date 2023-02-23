import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    announcementContent: {
      type: String,
      required: true,
    },
    announcement1Content: {
      type: String,
    },
    announcement2Content: {
      type: String,
    },
    announcement3Content: {
      type: String,
    },
    announcement4Content: {
      type: String,
    },
    announcement5Content: {
      type: String,
    },
    active:{
      type:Boolean,
    },
  },
  { timestamps: true }
);

const Announcement = mongoose.model("Announcement", userSchema);

export default Announcement;
