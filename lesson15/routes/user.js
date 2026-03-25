import {Router} from "express";
import User from "../models/User.js";

const userRouter = Router()

userRouter.post("/", (req, res) => {
  const userData = req.body;
  if (!userData) {
    return res.status(400).json({ error: "Failed to create user" });
  }
  
  User.create(userData)
    .then((data) => {
      res.status(201).json({ user: data });
    })
    .catch((err) => {
      return res.status(400).json({ error: "Failed to create user" });
    });
});

userRouter.get("/find-all", (req, res) => {
  User.find({}).sort({name: 1}).exec().then((users) => {
    res.status(200).json({users})
  }).catch((err) => {res.status(400).json({error: "Faild to fetch users"})})
})



userRouter.put("/update", (req, res) => {

  const updateUserData = req.body
const userId = "69c2d211d4a34d6f5ee1f6b4"
  User. findByIdAndUpdate(userId, updateUserData,
     {
   
      new: true,
      runValidator: true,
    },    
  ) .then((user) => {
      res.status(201).json({ message: "Updated user", user });
    })
    .catch((err) => {
      res.status(400).json({ error: "Failed to update user" });
    });
})

userRouter.delete("/delete", (req, res) => {
  const userId = "69c2d30b5a56665fb57000d5"

  User.findByIdAndDelete(userId, {delete: true})
  .then((user) => {
      res.status(201).json({ message: "UDelete user", user });
    })
    .catch((err) => {
      res.status(400).json({ error: "Failed to delete user" });
    });
} )





export default userRouter;