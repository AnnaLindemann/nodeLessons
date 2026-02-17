const fs = require("fs")

fs.writeFile("info.txt", "Node.js is awesome!", "utf-8",(err) => {
  if(err) { 
    console.error("File was not created", err)
  }
console.log("File was created and written")
} 
)
fs.readFile("info.txt","utf-8",(err,data)=>{
   if(err) { 
    console.error("File was not read", err)
  }
console.log("File was read:",data)

})