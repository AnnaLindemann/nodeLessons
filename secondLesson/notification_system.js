const EventEmitter = require("events")
const emitter = new EventEmitter()
const fs = require("fs")

const  sendNotification = (message,emitter) => {
  emitter.emit("notification", message)
}

const handler1 = (message) => {
    const time = new Date().toString()
    const LEVEL = "INFO"
    const fullMessage = `[${time}] [${LEVEL}] ${message}\n`
    fs.appendFile("z.txt", fullMessage, (err) => {
      if(err){
        console.log("Message was not send:", err)
      }
    })
  }

  const handler2 = (message) => {
    console.log(message)
  }
emitter.on("notification", handler1)
emitter.on("notification", handler2)

sendNotification("First message", emitter)
sendNotification("Second message", emitter)