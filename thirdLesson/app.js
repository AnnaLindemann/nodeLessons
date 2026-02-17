const fs = require("fs")

//ASYNC

// fs.readFile("input.txt","utf-8", (err,data) =>{
// if(err){
//   console.log("Error occuredwhile reading file:",err);
//   return
// }
// fs.writeFile("output.txt", data, "utf-8", (err) => {
// if(err){
//   console.error("Error occured while writing file:", err)
//   return
// }
// console.log("File was successfully created")
// })
// })

// console.log("render")

function readFile(filename){
  if(!filename){
    throw new Error ("There is no value file name")
  }
  fetch(filename)
}

//SYNC

try{
const data = fs.readFileSync("input.txt",  "utf8")
fs.writeFileSync("output.txt",data,"utf8")
console.log("File was successfully copied")
}catch(error){
console.error("Error occured while writing file:", error)
}