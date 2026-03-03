import dotenv from "dotenv"
import express from "express"
import sequelize from "./config/db.js"


dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.get("/", (req,res) => {
  res.send("It is working")
})

app.listen(PORT,async () => {
  try{
  await sequelize.authenticate()
  console.log("Connection to the database has been established successfully!");
 console.log(`Server is running at http://localhost:${PORT}`);
}catch(error){
console.error("Unable to connect to the database:", error);
}
})