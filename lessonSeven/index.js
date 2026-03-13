import dotenv from "dotenv"
import express from "express"
import sequelize from "./config/db.js"
import User from "./models/User.js"


dotenv.config()

const port = process.env.PORT || 3000
const app = express()

async function createUser(data){
try{

  const newUser = await User.create({
    name: data.name,
    email: data.email
  })
  console.log("User created", newUser)
} catch(error){
  console.error("Error creating user", error)
}
}

app.get("/", (req, res) => {
  res.send("Hello, Sequelize with Express!");
});

app.post("/register", (req,res) => {
createUser(req.body)


})

app.listen(port,async () => {
try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully!",
    );
    console.log(`Server is running at http://localhost:${port}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})