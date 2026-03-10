import dotenv from "dotenv"
dotenv.config()
import express from "express"
import sequelize from "./config/db.js"
import User from "./models/User.js"
import bcrypt from "bcrypt"

const PORT = process.env.PORT || 3333

const app = express()

app.use(express.json())

app.get("/", (_req,res) => {
  res.send("It is working")
})

async function checkMustChangePassword(req,res,next){
  try{
    const {email} = req.body
    if(!email){
  return res.status(400).send("Email is required")
}

const user = await User.findOne({where:{email}})

if(!user){
   return res.status(404).send("User not found")
}
if(user.mustChangePassword){
  return res.status(403).send("You must change password first")
}

next()
  }catch(error){
    console.error("Middelware error:", error);
  return res.status(500).json({
    message: "Server error",
    error: error.message,
  })
}
}

app.post("/register",async (req, res) => {
try {const {username, email, password} = req.body

if(!username || !email || !password){
  return res.status(400).send("All fields are required")
}

const existingEmail = await User.findOne({where: {email}})
 
if(existingEmail){
  return res.status(400).send("User with this email already exist")
}

const passwordHash = await bcrypt.hash(password,10)

await User.create({username, email, passwordHash})

return res.status(201).send("User was successfully created")
} catch(error){
   console.error("Register error:", error);
  return res.status(500).json({
    message: "Error when register user",
    error: error.message,
})
}
})

app.post("/profile", checkMustChangePassword, (req, res) => {
  res.status(200).send("Profile access granted");
});

app.post("/change-password",async (req,res) => {
  try{
    const {email, newPassword} = req.body
    if (!email || !newPassword) {
      return res.status(400).send("Email and new password are required")
    }

    const user = await User.findOne({where:{email}})
     if (!user) {
      return res.status(404).send("User not found")
    }

    const newPasswordHash = await bcrypt.hash(newPassword,10)

    await user.update({
      passwordHash: newPasswordHash,
      mustChangePassword: false,
    })
    return res.status(200).send("Password changed successfully");

  } catch(error){
     console.error("Change password error:", error)
    return res.status(500).send("Server error")
  }
})

app.post("/delete-account", async(req,res) => {
  try {
    const {email, password} = req.body

  if (!email || !password) {
      return res.status(400).send("Email and password are required")
    }

    const user = await User.findOne({where: {email}})

    if (!user) {
      return res.status(404).send("User not found")
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)
    if(!isPasswordValid){
     return res.status(400).send("Invaild password or login")
   }

   await user.destroy()

   return res.status(200).send("User was deleted")
    
} catch(error){
   console.error("Change password error:", error)
    return res.status(500).send("Delete error")
}
})

async function isAccessAllowed(req, res, next) {
  try {
    const {email } = req.query

  if (!email) {
      return res.status(400).send("Email is required")
    }

  const user = await User.findOne({where: {email}})  
if (!user) {
      return res.status(404).send("User not found")
    }
if(user.role !== "admin"){
  return res.status(403).send("Access is forbidden")
}
  next()
} catch(error){
   console.error("Middelware error:", error);
  return res.status(500).json({
    message: "Server error",
    error: error.message,
  })
}
}


app.get("/admin",isAccessAllowed, (req, res) => {

return res.status(200).send("Access is allowed");   
})

app.post("/change-email", async (req, res) => {
  try {
    const { email, password, newEmail } = req.body

    if (!email || !password || !newEmail) {
      return res.status(400).send("Email, password and new email are required")
    }

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.status(404).send("User not found")
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
      return res.status(400).send("Invalid password or login")
    }

    const existingEmail = await User.findOne({ where: { email: newEmail } })

    if (existingEmail) {
      return res.status(400).send("User with this email already exists")
    }

    await user.update({
      email: newEmail,
    });

    return res.status(200).send("Email is updated")
  } catch (error) {
    console.error("Change email error:", error)
    return res.status(500).send("Server error")
  }
});


app.listen(PORT,async () => {
  try {
    await sequelize.authenticate()
  console.log("Connection to the database has been established successfully!")
  console.log(`Server is running at http://localhost:${PORT}`)
} catch(err){
  console.error("Unable to connect to the database:", err)
}
})