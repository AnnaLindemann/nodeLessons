import dotenv from "dotenv"
dotenv.config()
import express from "express"
import sequelize from "./config/db.js"

const PORT = process.env.PORT
const app = express()
app.get("/", (_req,res)=> {
  res.send("It is working")
})

app.listen(PORT,async () => {
try{
    await sequelize.authenticate()
    console.log("Connection to the database has been established successfully!");
  console.log(`Server is running at http://localhost:${PORT}`)
}catch(err){
console.error("Unable to connect to the database:", err);
}
})