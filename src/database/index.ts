import mongoose, { Connection } from "mongoose";

let conn: Connection;

export default function initDB(dbUrl: string): void {
  mongoose.connect(dbUrl, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    conn = mongoose.connection;
    console.log("Database connected");
  });
}

export { conn };
