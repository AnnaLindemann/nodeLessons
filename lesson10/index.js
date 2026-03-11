import dotenv from "dotenv"
dotenv.config()
import express from "express"
import sequelize from "./config/db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const PORT = process.env.PORT || 3333
const jwtSecret = process.env.JWT_SECRET_KEY
const app = express()

app.use(express.json())
const users = [
  {id: 1,
    email: "user@gmail.com",
    password: await bcrypt.hash("password111",10)
  },
   {id: 2,
    email: "user2@gmail.com",
    password: await bcrypt.hash("password111",10)
  },
   {id: 3,
    email: "user3@gmail.com",
    password: await bcrypt.hash("password111",10)
  }
]

app.get("/", (_req,res) => {
  res.send("It is working")
  console.log(users)
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

app.listen(PORT,async () => {
  try {
    await sequelize.authenticate()
  console.log("Connection to the database has been established successfully!")
  console.log(`Server is running at http://localhost:${PORT}`)
} catch(err){
  console.error("Unable to connect to the database:", err)
}
})