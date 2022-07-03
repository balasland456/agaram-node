import cookieParser from "cookie-parser";import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";
dotenv.config();

import initDB from "./database";
import Handler from "./exceptions";
import { ArticleRouter } from "./routes/article-routes";
import { AuthRouter } from "./routes/auth-routes";
import { TransactionRouter } from "./routes/transaction-routes";
import { uploadRouter } from "./routes/upload-routes";
import { UserRoutes } from "./routes/user-routes";

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
app.use("/api/upload", uploadRouter);

let dir = __dirname.replace("/src", "");

if (process.env.NODE_ENV === "production") {
    dir = __dirname.replace("/dist", "");
    app.use(express.static(path.join(dir, "./client/dist/client")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(dir, "client", "dist", "client", "index.html"));
    });
}

// handle errors
app.use("*/", Handler.handleError);

const DB_URL = process.env.DB_URL || "";

initDB(DB_URL);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
    // const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? "", 6);
    // const userObj = new User({
    //     email: "user@example.com",
    //     password: hashedPassword,
    //     firstName: "ADMIN",
    //     type: UserType.ADMIN,
    //     username: "admin",
    //     name: "admin",
    //     employeeId: "1",
    //     mobileNo: "string",
    //     address: "aaa",
    //     contactPerson: {
    //         name: "string",
    //         mobileNo: "string",
    //         email: "string",
    //     },
    // });
    // const savedUser = await userObj.save();
    console.log(`Server connected at http://localhost:${PORT}`);
});
