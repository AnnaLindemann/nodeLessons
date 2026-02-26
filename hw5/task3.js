import http from "http"

const port = 3333

const server = http.createServer((req,res) => {
if(req.method === "PUT") {
  res.statusCode = 200
  res.setHeader("Content-Type","text/plain")
  res.end("PUT request processed")
} else if(req.method === "DELETE"){
   res.statusCode = 200
  res.setHeader("Content-Type","text/plain")
  res.end("DELETE request processed")
} else{
    res.statusCode = 405;
    res.end("Method not allowed");
  }
})
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})