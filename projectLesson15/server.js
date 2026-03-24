import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./db/db.js";
import productRouter from "./routes/product.js";


const app = express();
const port = process.env.PORT || 3333;

app.use(express.json());

app.use("/products",productRouter )

async function startServer() {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer();