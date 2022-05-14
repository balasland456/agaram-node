import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";

import initDB from "./database";
import Handler from "./exceptions";
import { AuthRoter } from "./routes/auth-routes";

// init app
const app = express();

//CORS
app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    credentials: true,
  })
);

// global middlewares
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", AuthRoter);

// handle errors
app.use("*/", Handler.handleError);

const DB_URL = process.env.DB_URL!;

initDB(DB_URL);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
//   const hashedPassword = await bcrypt.hash("password", 6);
//   const userObj = new User({
//     email: "user@example.com",
//     password: hashedPassword,
//     firstName: "ADMIN",
//     type: UserType.ADMIN,
//     username: "admin"
//   });
//   const savedUser = await userObj.save();
  console.log(`Server connected at http://localhost:${PORT}`);
});
