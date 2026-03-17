import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();
const uri = process.env.MONGO_URI || "url";
const client = new MongoClient(uri);
let dbConnection = null;
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Conncted successfully to MongoDB");
    dbConnection = client.db(process.env.MONGO_DB);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}
function getDb() {
  if (!dbConnection) {
    throw new Error("Database not connected!");
  }
  return dbConnection;
}
export { connectToDatabase, getDb };