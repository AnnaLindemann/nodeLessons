import http from "http"

const port = 3333
const server = http.createServer((req, res) => {
const header = req.headers["authorization"]
if(typeof header === "string"){
  res.statusCode = 200
  res.setHeader("Content-Type", "text/plain")
  res.end("Status:200 - Authorization header received")
} else{
  res.statusCode = 401
  res.end("Status:401 - Unauthorized")
}
})

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})