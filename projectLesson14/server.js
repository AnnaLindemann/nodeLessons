import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./db/db.js";
import authRouter from "./routes/auth.js";
import postRouter from "./routes/post.js";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.use("/auth", authRouter);
app.use("/posts", postRouter)

async function startServer() {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer();