const express = require("express");
const fs  = require("fs");
const app = express();
const port = 3333;

app.get("/",(req,res) => {
  res.send("Hello World!")
})

app.get("/users", (req, res) => {
  res.json({name: "Alise", age: 45})
})

app.get("/create-file", (req, res) => {
  fs.writeFile("test.txt", "new file", (err) =>{
    if(err){
      console.log("ERROR");
      return res.send("Error 400")
    }
    return res.send("File created")
  })
})

app.listen(port,() => {
  console.log(`Server is running at http://localhost:${port}`);
})