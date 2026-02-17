const fs = require("fs")
const path = require("path")

const myFolderPath = path.join(__dirname,"myFolder")

fs.mkdir(myFolderPath,{recursive:true}, (err) => {
  if(err){
    console.error("Catalog was not created", err)
    return
  }
  console.log("Catalog was created")
})
fs.rmdir(myFolderPath, (err) => {
  if(err){
    console.error("Catalog was not deleted", err)
    return
  }
  console.log("Catalog was successfully deleted")
})