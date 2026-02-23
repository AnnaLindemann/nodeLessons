const fs =require("fs");
require("dotenv").config();

const fileName = process.env.FILENAME

fs.writeFile(fileName, "Text from env", "utf-8", (err) => {
  if(err){
    console.error("File was not written",err)
    return
  }
  console.log("File was written")
})
fs.readFile(fileName, "utf-8", (err,data) => {
  if(err){
  console.error("File was not read")
  return
}
  console.log("File was written",data)
} 
)