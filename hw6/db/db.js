import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

dbConnection.connect((err) => {
  if(err){
    console.log("Error connection to the database:", err.stack);
    return;
  }
  console.log("Connected to the database as id " + dbConnection.threadId);
})

export default dbConnection;