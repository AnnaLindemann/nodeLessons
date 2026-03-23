// import mongoose from "mongoose";

// export async function connectDB() {
//   const dbURI = process.env.MONGO_URI;

//   if (!dbURI) {
//     throw new Error("MONGO_URI is not defined in .env");
//   }

//   try {
//     await mongoose.connect(dbURI);
//     console.log("Successfully connected to MongoDB");
//   } catch (error) {
//     console.error("Failed to connect to MongoDB", error);
//     process.exit(1);
//   }
// }


import mongoose from "mongoose";

export async function connectDB(){
  const dbURI  = process.env.MONGO_URI;

  if(!dbURI){
    throw new Error("MONGO_URI is not defined in .env");
  }
try{
  await mongoose.connect(dbURI);
  console.log("Successfully connected to MongoDB");
} catch(error){
console.error("Fa}iled to connect to MongoDB", error);
process.exit(1);
}
}