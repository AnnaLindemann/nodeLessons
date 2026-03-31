import dotenv from "dotenv";
dotenv.config();

import express from "express";
import http from "http";
import { Server } from "socket.io";
import { connectDB } from "./db/db.js";

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3333;

const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
   
  socket.on("chat message", (msg) => {
    console.log("Message from client:", msg);

    socket.emit("message received", `Server received: ${msg}`)
  })

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

async function startServer() {
  await connectDB();

  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
}

startServer();