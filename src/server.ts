import express from "express";
import articleController from "./controller.ts/articleController";
import initDB from "./database";
import articleRoutes from "./routes/articleRoutes";
import dotenv from "dotenv";

// init app
const app = express();



// env file init
dotenv.config();

// body parser
app.use(express.json());

// routes 
app.use ("/api", articleRoutes);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server connected at http://localhost:${PORT}`);
});

// db init
const dbUrl = process.env.DATABASE_URL as string;
initDB(dbUrl);


