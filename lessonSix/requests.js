import express from "express";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT || 3333;
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.post("/submit", (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const email = req.body.email;
  res.status(201).json({ id: 1, username, email });
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});
app.get("/users", (req, res) => {
  res.send("This is a list of users");
});
app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  // fetch to db
  res.send(`User ID with data: ${userId} and DATATATATA`);
});
// BASE_URL/search?phrase=hello
app.get("/search", (req, res) => {
  const phrase = req.query.phrase;
  if (!phrase) {
    res.send("Got all result");
    return;
  }
  res.send(`We found your phrase: ${phrase}`);
});


app.get("/users/:id", (req,res) => {
  const userId = req.params.id
  const userName = req.query.name 
  res.send(`User ID: ${userId}, User name: ${userName}`);
})

app.get("/json", (req,res) => {
  res.status(200).json({ id: 3, name: "Alex", phoneNumber: "985468745687" })
})


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

////////////////////////////////
import express from "express";
import dotenv from "dotenv";
dotenv.config();
// const port = process.env.PORT || 3000
// const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.get("/users", (req,res) => {
//   res.send("List of users")
// })

app.get("/users/:id", (req,res,next) => {

const userId = req.params.id
if(!userId || userId > 1000){
  const error = new Error("User not found. UserID was not provided")
  error.status = 404
  return next(error)
}
res.send(`User ID: ${userId}`)
})

app.use((err,req,res,next) => {
console.log(err)
res.status(err.status || 500).json({message: err.message})
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});