import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { connectToDatabase, getDb } from "./db.js"

const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3333
const app = express()
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Project run")
})
app.post("/users", async (req, res) => {
  try {
    const db = getDb();
    const user = req.body;
    if (!user.name || !user.email) {
      return res.status(400).json({ message: "Name and email are required!" });
    }
    const newUser = await db.collection("users").insertOne(user);
    res
      .status(201)
      .json({ message: "User successfully registred!", data: newUser });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
});
connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server because MongoDB connection failed", error);
  });

