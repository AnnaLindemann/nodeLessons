import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "users_db",
})



dbConnection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message)
    return
  }
  console.log("Connected to the database. Thread ID:", dbConnection.threadId)
})

export default dbConnection