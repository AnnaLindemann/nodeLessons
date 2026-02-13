const EventEmitter = require("events")
const emitter = new EventEmitter()
const http = require("http")

const PORT = 3333
const HOST = "127.0.0.1"

emitter.on("HomePage", (message) => {
  console.log(`HomePage: ${message}`)
})
emitter.on("AboutUsPage", (message) => {
  console.log(`AboutUsPage: ${message}`)
})
emitter.on("error", (message) => {
  console.log(`Error: ${message}`)
})
const server = http.createServer((req,res) => {
if(req.url === "/"){
  emitter.emit("HomePage", `user made request on ${req.url} `)
  res.end("Welcome to the Home Page!")
  return
} else if(req.url === "/about"){
  emitter.emit("AboutUsPage", `user made request on ${req.url}`)
  res.end("About Us")
  return
}
emitter.emit("error", `error on ${req.url}`)
res.end("404 Not Found")

})

server.listen(PORT,HOST, () => {
  console.log(`Server started at ${HOST}:${PORT}`)
})