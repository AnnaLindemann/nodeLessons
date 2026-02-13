const EventEmitter = require("events")
const emitter = new EventEmitter()

const handler = (name,message) => {
  console.log(`${name}: ${message}`)
}
const sendMessage = (name,message, emitter) => {
emitter.emit("message",name, message )
}

emitter.on("message",handler)

sendMessage("Alice", "Hello everybody",emitter)
sendMessage("Ben", "I like Node",emitter)
sendMessage("John", "I am happy to be here",emitter)