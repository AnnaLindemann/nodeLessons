import { Router } from "express";
import Post from "../models/Post.js";
import { authenticateJWT } from "../middlewares/authenticateJWT.js";

const postRouter = Router();

postRouter.get("/", async (req, res) => {
  try{
  const posts = await Post.find()
  res.status(200).json(posts)
} catch(error){
  res.status(500).json({message: "Internal error"})
}
})

postRouter.post("/", authenticateJWT, async (req, res) => {
  try{
    const {title, content} = req.body;
if(!title || !content){
  return res.status(400).json({message: "All fields are required"})
}
 const author = req.user._id

 const newPost = await Post.create({
 author,
  title,
  content,
 })

 res.status(201).json({ message: "Post was successfully created",post: newPost})
  }catch(error){
 res.status(500).json({message: "Internal error"})
  }
})


export default postRouter;