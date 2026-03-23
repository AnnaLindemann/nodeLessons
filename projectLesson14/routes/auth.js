import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const authRouter = Router();


authRouter.post("/register",async (req, res) => {
try{ 
  const {email, username, password} = req.body;
if(!email || !username || !password){
  return res.status(400).json({message: "All fields are required"})
}
const existingUser = await User.findOne({email});

if(existingUser){
  return res.status(409).json({message: "User with this email already exists"})
}

const passwordHash = await bcrypt.hash(password,10);

const newUser = await User.create({
  username,
  email,
  passwordHash,
})

res.status(201).json({message: "User registered successfully", user: {
  id: newUser._id,
  username: newUser.username,
  email: newUser.email,
  
}})

}catch(error){
 res.status(500).json({message: "Internal error"})
}


});

authRouter.post("/login",async (req, res) => {
  const jwtSecret = process.env.JWT_SECRET
try { const {email, password} = req.body;
if(!email || !password){
  return res.status(400).json({message: "All fields are required"})
}
const user = await User.findOne({email});

if(!user){
  return res.status(401).json({message: "Invalid email or password"});
}

const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);

if(!isPasswordMatch){
  return res.status(401).json({message:"Auth failed. Email or password are inccorect"});
}

const token = jwt.sign({
  _id: user.id,
  email: user.email,
},
jwtSecret,
{
  expiresIn: "3h",
})
res.json(token);
} catch(error){
  res.status(500).json({message: "Internal error"})
}
});

export default authRouter;