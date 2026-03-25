import { Router } from "express";
import Post from "../models/Post.js";
const postRouter = Router();
postRouter.post("/", (req, res) => {
  const postData = req.body;
  if (!postData) {
    return res.status(400).json({ error: "Failed to create post" });
  }
  Post.create(postData)
    .then((data) => {
      res.status(201).json({ user: data });
    })
    .catch((err) => {
      res.status(400).json({ error: "Failed to create post" });
    });
});
postRouter.get("/find-all", (req, res) => {
  Post.find({})
    .populate(["author"])
    .exec()
    .then((posts) => {
      res.status(200).json({ posts });
    })
    .catch((err) => {
      res.status(400).json({ error: "Failed to fetch posts" });
    });
});
export default postRouter;