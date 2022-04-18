import express from "express";

// init app
const app = express();

// body parser
app.use(express.json());

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server connected at http://localhost:${PORT}`);
});