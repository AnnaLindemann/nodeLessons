const http = require("http")
const logger = require("./logger")
const PORT = 3333;
const HOST = "127.0.0.1";

// console.log(logger)
const server = http.createServer((req, res) =>{
  if (req.url === "/hello"){
    logger.emit("info", `user made requst on ${req.url}`)
    res.end("hello")
    return
  } else if (req.url === "/warn"){
    logger.emit("warning", `warning on ${req.url}`)
    res.end("warning")
    return
  }
  logger.emit("error", `error on ${req.url}`)
  res.end("404 not found")
})

server.listen(PORT, HOST, () => {
  console.log(`Server started at ${HOST}:${PORT}`)
})