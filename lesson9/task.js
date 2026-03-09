import dotenv from "dotenv"
dotenv.config()
import express from "express"
import sequelize from "./config/db.js"
import User from "./models/User.js"
import bcrypt from "bcrypt"


const PORT = process.env.PORT

const app = express()
app.use(express.json())



// const users = [
//   {
//     id: 1,
//     username: "alice",
//     password: "h$2b$10$7a0YcY2V5j5u0G6rJ2l9QeD3F5YH0P3m2mVqYkVqU7G4iKZJvFh3a",
//     email: "alice@example.com",
//     name: "Alice"
//   },
//   {
//     id: 2,
//     username: "bob",
//     password: "2b$10$X1z2N0y7Q4VbJdZ3gYqF6OQ2p9F4VjR8K1LxJbGm5V3aT2cWq1E6W",
//     email: "bob@example.com",
//     name: "Bob"
//   }
// ];


// app.use((req,res, next) => {
//   req.user = {id: 1}
//   next()
// })
// app.get("/profile/:id", (req, res) => {
//   const id = Number(req.params.id)
//   if(id !== req.user.id){
//     return res.status(403).send("Access is not allowed")
//   }
// const user = users.find((user) => user.id === id)
// if(!user){
//   return res.status(404).send("User not found")
// }
// return res.status(200).send({username: user.username, email: user.email,name: user.name})
// })


// app.put("/profile/:id", (req,res) => {

//   const id = Number(req.params.id)

//   if(id !== req.user.id){
//     return res.status(403).send("Access is not allowed")
//   }

//   const user = users.find((user) => user.id === id)
//   if(!user){ 
//     return res.status(404).send("User not found")
//   }

//   const {email, name} = req.body

//    if (!email || !name) {
//     return res.status(400).send("Email and name are required");
//   }

//   user.name = name
//   user.email = email

//   return res.status(200).json({
//     message: "Profile updated successfully",
//     user: {
//       id: user.id,
//       username: user.username,
//       email: user.email,
//       name: user.name,
//     },
//   });

// })


app.listen(PORT,async () => {
try{
    await sequelize.authenticate()
    console.log("Connection to the database has been established successfully!");
  console.log(`Server is running at http://localhost:${PORT}`)
}catch(err){
console.error("Unable to connect to the database:", err);
}
})

// app.get("/", (_req,res)=> {
//   res.send("It is working 2")
// })
// //registration
// app.post("/register",async (req,res) => {
//   try{
//   //getting name and pass
//  const {username, password} = req.body

// if (!username || !password) {
//   return res.status(400).send("All fields are required")}
// //validation
// const user = users.find((user) => user.username === username)
// if(user){
//   return res.status(400).send("User with this username already exist")
// }

//  //hashing pass
//  const hashPassword = await bcrypt.hash(password, 10)

//  //save to database
//  users.push({username, hashPassword})
//  console.log(users)

//  //send responce
//  res.status(200).send("User was successfully registred")
//   }catch(error){
//     res.status(500).send("Error when register user")
//   }
// })

// //auth
// app.post("/login",async (req,res) => {
// try{
//   //get user info
//   const {username, password} = req.body
//   if(!username || !password){
//      return res.status(400).send("All fields are required")
//   }
//   const user = users.find((user) => user.username === username)

//   if(!user){
//     return res.status(400).send("User with this username is not found")
//   }
//  const isPasswordVaild = await bcrypt.compare(password,user.hashPassword)

//  if(!isPasswordVaild){
//   return res.status(400).send("Invaild password or login")
//  }

//  res.send("Successfull login!")
// }
// catch(error){
//   res.status(500).send("Error when loging in")
// }})