import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

import initDB from "./database";
import Handler from "./exceptions";
import { AuthRouter } from "./routes/auth-routes";
import { ArticleRouter } from "./routes/article-routes";
import { UserRoutes } from "./routes/user-routes";
import User from "./models/user";
import { UserType } from "./types";
import { TransactionRouter } from "./routes/transaction-routes";

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
app.use("/api/auth", AuthRouter);
app.use("/api/article", ArticleRouter);
app.use("/api/transaction", TransactionRouter);
app.use("/api/user", UserRoutes);

// handle errors
app.use("*/", Handler.handleError);
.
const DB_URL = mongodb+srv://agaram:<Password123@#>@cluster0.s9hib.mongodb.net/?retryWrites=true&w=majority;

initDB(DB_URL);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  // const hashedPassword = await bcrypt.hash("password", 6);
  // const userObj = new User({
  //   email: "user@example.com",
  //   password: hashedPassword,
  //   firstName: "ADMIN",
  //   type: UserType.ADMIN,
  //   username: "admin",
  //   name: "admin",
  //   employeeId: "1",
  //   mobileNo: "string",
  //   address: "aaa",
  //   contactPerson: {
  //     name: "string",
  //     mobileNo: "string",
  //     email: "string",
  //   },
  // });
  // const savedUser = await userObj.save();
  console.log(`Server connected at http://localhost:${PORT}`);
});
