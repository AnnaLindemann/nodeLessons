import dotenv from "dotenv"
dotenv.config()
import express from "express"
import sequelize from "./config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "./models/User.js"
import { authenticateJWT } from "./middelwares/authenticateJWT.js"
import { authorizeRole } from "./middelwares/authorizeRole.js"



const PORT = process.env.PORT || 3333
const jwtSecret = process.env.JWT_SECRET_KEY
const app = express()

app.use(express.json())


app.get("/", (_req,res) => {
  res.send("It is working")
 })

app.post("/register", async (req, res) => {
try{
const {email, username, password} = req.body

if(!username || !email || !password){
  return res.status(400).send("All fields are required")
}

const existingEmail = await User.findOne({where: {email}})

if(existingEmail){
  return res.status(400).send("User with this email already exist")
}

const passwordHash = await bcrypt.hash(password,10)

await User.create({username, email, passwordHash})

return res.status(201).json({message: "User was successfully created"})

}catch(error){
   console.error("Register error:", error);
  return res.status(500).json({
    message: "Error when register user",
    error: error.message,
})
}
})

app.post("/login", async (req, res) => {
 
const {email, password} = req.body
if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }
 try{
const user = await User.findOne({where:{email}})

if(!user){
  return res.status(404).json({message:"User not found" })
}
const isPasswordMatch = await bcrypt.compare(password, user.passwordHash)

if(!isPasswordMatch){
  return res.status(401).json({message:"Auth failed. Email or password are inccerect"})
}

const token = jwt.sign({
  userId: user.id,
  email: user.email,
  role: user.role
},
jwtSecret,
{
  expiresIn: "1h",
})
res.json({token})
  }catch(error){
     res.status(500).json({ message: "Server Error" });
  }
})

app.put("/update-email", authenticateJWT, async (req, res) => {
  const { newEmail} = req.body
  

  if( !newEmail){
    return  res.status(400).send("New email is required")
  }
  try{
    const {userId} = req.user
    const user = await User.findOne({where:{id:userId}}) 

if(!user){
      return res.status(404).json({message:"User not found"})
    }

const isNewEmailExist = await User.findOne({where:{email: newEmail}})
if(isNewEmailExist && isNewEmailExist.id !== req.user.userId){
    return res.status(400).json({message: "Email already exists"})
}
 user.email = newEmail
await user.save()
return res.status(200).json({message: "Email was successfully changed", email: newEmail})

  } catch(error){
    console.error("Change email error:", error)
    return res.status(500).json({message:"Server error"})
  }
})


app.delete("/delete-account",authenticateJWT, async (req, res) => {

try{
const {userId} = req.user

const user = await User.findOne({where: {id: userId}})

if(!user){
      return res.status(404).json({message:"User not found"})
    }

await user.destroy()

return res.status(200).json({message: "User was deleted"})

} catch(error){
  console.error("Delete account error:", error)
    return res.status(500).json({message:"Server error"})
}
})


app.patch("/update-role", authenticateJWT,authorizeRole("admin"), async (req, res) => {
try{
  const {id,newRole} = req.body

   if( !id || !newRole){
    return  res.status(400).send("All fields are required")
  }

  const user = await User.findByPk(id)
  if(!user){
    return res.status(400).json({message: "User not found"})
  }
user.role = newRole
  await user.save()
  return res.status(200).json({message: "Role was successfully changed",role: user.role, userId: user.id})
}catch(error){
   console.error("Change role error:", error)
    return res.status(500).json({message:"Server error"})
}

} )


app.post("/refresh-token",  (req, res) => {
const authHeader = req.headers.authorization
if(authHeader && authHeader.startsWith("Bearer ")){
const token = authHeader.split(" ")[1]

jwt.verify(token, jwtSecret,(err, decoded) => {
  if(err){
    return res.status(403).json({message: "Forbidden: Invalid or expired token"})
  }

const newToken = jwt.sign({
  userId:decoded.userId,
  email: decoded.email,
  role: decoded.role
},
jwtSecret,
{
  expiresIn: "1h"
})

return res.status(200).json({message: "Token was updated", token: newToken})
})
}else {
  return res.status(401).json({message:"Unauthorized: No token provided or it's invalid" })
}
})

app.listen(PORT,async () => {
  try {
    await sequelize.authenticate()
  console.log("Connection to the database has been established successfully!")
  console.log(`Server is running at http://localhost:${PORT}`)
} catch(err){
  console.error("Unable to connect to the database:", err)
}
})