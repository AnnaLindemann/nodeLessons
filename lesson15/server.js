import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./db/db.js";
import postRouter from "./routes/post.js";
import userRouter from "./routes/user.js";

const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());


app.use("/post", postRouter)
app.use("/user", userRouter )

async function startServer() {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer();