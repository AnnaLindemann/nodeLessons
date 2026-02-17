const fs = require("fs")
const path = require("path")


const filePath = path.join(__dirname, "example.jpg")
const renamedPath = path.join(__dirname, "files", "renamedExample.jpg");
const copyPath = path.join(__dirname, "test", "copyOfExample.jpg");

fs.rename(filePath, renamedPath, (err) => {
  if(err){
    console.error("File was not renamed/moved",err)
    return
  }
  fs.copyFile(renamedPath, copyPath, (err) => {
    if(err){console.error("File was not copied",err)
      return
    }
 
  fs.unlink(renamedPath, (err) => {
     if(err){
    console.error("File was not deleted",err)
    return
  }
  console.log("File was successfully deleted")
  })
 })
} )