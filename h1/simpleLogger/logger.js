
const fs = require("fs")

const logMessage = (message) =>{
const timestamp = new Date().toISOString()
const LEVEL = "INFO"
const fullMessage = `[${timestamp}] {${LEVEL}} ${message}\n`
  fs.appendFile("log.txt",fullMessage, (err) => {
    if(err){
      console.log("Message was not added:",err)
    } 
  })
}

module.exports = { logMessage}