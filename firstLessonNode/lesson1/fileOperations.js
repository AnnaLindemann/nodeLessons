const fs = require("fs");

fs.writeFile("example.txt", "Hello, Node.js!", (err) => {
  if(err) {
    console.log("Error while writing ne file:", err);
    return
  }
  console.log("File was successfully created!");

fs.readFile("example.txt","utf8", (err,data) => {
    if(err){
      console.log("Error while reading file", err)
    }
    console.log("File as successfully read", data)
    fs.unlink("example.txt",(err) => {
      if(err){console.log("Error while deleting file:", err)}
     console.log("File was successfull deleted")
    })
  })
}) 
