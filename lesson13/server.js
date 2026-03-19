import dotenv from "dotenv"
dotenv.config()
import express from "express"
import mongoose from "mongoose"

const app = express()
const dbURI = process.env.MONGO_URI || "URI"
const port = process.env.PORT || 3333

mongoose.connect(dbURI)
.then (()=> {
  console.log("Successfully connected to MongoDB")
})
.catch((error)=>{
  console.log("Failed to connect to MongoDB",error)
}) 

app.listen(port, () => {
  console.log(`Server is runig at http://localhost:${port}`)
})