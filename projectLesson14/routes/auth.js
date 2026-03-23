import { Router } from "express";

const authRouter = Router();

authRouter.post("/register", (req, res) => {
  res.send("User registered");
});

authRouter.post("/login", (req, res) => {
  res.send("User logged in!");
});

export default authRouter;