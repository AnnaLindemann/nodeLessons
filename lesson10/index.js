import dotenv from "dotenv"
dotenv.config()
import express from "express"
import sequelize from "./config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { authJWT, authorizeRole } from "./middelwares/auth.js"
import { authJWT2 } from "./middelwares/authMy.js"

const PORT = process.env.PORT || 3333
const jwtSecret = process.env.JWT_SECRET_KEY
const app = express()

app.use(express.json())
const users = [
  {id: 1,
    email: "user@gmail.com",
    password: await bcrypt.hash("password111",10),
    role: "admin",
  },
   {id: 2,
    email: "user2@gmail.com",
    password: await bcrypt.hash("password111",10),
    role: "mahager",
  },
   {id: 3,
    email: "user3@gmail.com",
    password: await bcrypt.hash("password111",10),
    role: "manager",
  }
]

app.get("/", (_req,res) => {
  res.send("It is working")
  console.log(users)
})

app.get("/profile", authJWT,(req,res)=> {
res.json({
  status: "success",
  data: req.user,
})
})



app.get("/admin",authJWT,authorizeRole("admin"), (req, res) => {
res.send("admin page")
})



app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }
  try {
    const user = users.find((user) => user.email === email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordsMatch) {
      return res
        .status(401)
        .json("Auth failed. Email or password are inccerect");
    }
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      {
        expiresIn: "1h",
      },
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});
////////// TASK 1 //////////////////////
app.put("/update-profile",authJWT2,  async (req,res) => {
try { 
  const { newEmail } = req.body 
  
  if( !newEmail){
  return res.status(400).json({message: "New email is required"})
} 
const user = users.find((u) => req.user.userId === u.id)

  if(!user){
    return res.status(404).json({message:"User not found"})
}
const existingEmail = users.find((u) => u.email === newEmail)

if(existingEmail && existingEmail.id !== user.userId ){
  return res.status(400).json({message: "Email already exists"})
}
 
   user.email = newEmail 
   
  return res.status(200).json({message: "Email was successfully changed", email: user.email})


} catch(error){

 console.error("Change email error:", error)
    return res.status(500).send("Server error")
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