import mongoose from "mongoose";

export default function initDB(dbUrl: string): void {
  mongoose.connect(dbUrl, (err) => {
    if (err) {
      console.error(err);
    }
    console.log("Database connected");
  });
}