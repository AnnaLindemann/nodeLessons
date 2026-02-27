import express from "express";
import dotenv from "dotenv";
import dbConnection from "./db/config.js";
dotenv.config();
const port = process.env.PORT || 3000
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get("/users", (req, res) => {
  const getAllUsersQ = `SELECT * FROM users`;
dbConnection.query("SELECT * FROM users", (err, results) => {
  if (err) {
    console.error(err)
    return res.status(500).json({ error: err.message })
  }
  res.json(results)
})
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});