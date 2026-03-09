//Реализовать регистрацию и аутентификацию для сущности пользователь с помощью orm. Реализовать два запроса /register и /login

import dotenv from "dotenv"
dotenv.config()
import express from "express"
import sequelize from "./config/db.js"
import User from "./models/User.js"
import bcrypt from "bcrypt"


const PORT = process.env.PORT

const app = express()
app.use(express.json())


app.post("/register",async (req,res) => {
  try{
const {username, password} = req.body

if(!username || !password) {
  return res.status(400).send("All fields are required")
}

const user = await User.findOne({where: {username}})
if(user){
  return res.status(409).send("User with this username already exist")
}

const passwordHash = await bcrypt.hash(password,10)

await User.create({username, passwordHash})

return res.status(201).send("User was successfully created")
  } catch(err){
  return  res.status(500).send("Error when register user")
  }
})


app.post("/login", async (req, res) => {
  try{
  const {username, password} = req.body
  
  if(!username || !password){
      return res.status(400).send("All fields are required")
 }

 const user =await User.findOne({where: {username}})

 if(!user){
   return res.status(400).send("User with this username is not found")
 }

 const isPasswordVaild = await bcrypt.compare(password,user.passwordHash)
 if(!isPasswordVaild){
   return res.status(400).send("Invaild password or login")
 }

 return res.status(200).send("Successfully login!")

  } catch(err){
return res.status(500).send("Error when loging in")
  }
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

