import dotenv from "dotenv"
dotenv.config()
import express, { application } from "express"
import mongoose, { mongo } from "mongoose"

const app = express()
const port = process.env.PORT || 3333
const dbURI = process.env.MONGO_URI || "URI"

mongoose.connect(dbURI)
.then(() => {
  console.log("Successfully connected to MongoDB")
})
.catch((error) => {
  console.log("Failed to connect to MongoDB",error)
})


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})