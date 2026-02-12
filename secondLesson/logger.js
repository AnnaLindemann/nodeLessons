const EventEmmiter = require("events")
const logger = new EventEmmiter()
const chalk = require("chalk")

logger.on("info", (message) => {
  // console.log(`Info:${message}`)
})
logger.on("warning", (message) => {
  // console.log(`Warning:${message}`)
})
logger.on("error", (message) => {
  // console.log(`Error:${message}`)
})

logger.emit("info", "Server started")
logger.emit("warning", "High memory usage")
logger.emit("error", "Server crashed")


module.exports = logger