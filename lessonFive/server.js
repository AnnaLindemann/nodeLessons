import http from "http";

const PORT = 3333

const server = http.createServer((req, res) => {
  if(req.url === "/user"){
    res.end("Hello")
  }
  res.statusCode =200;
  res.setHeader("Content-type", "text/plain");
  res.end("The task is done")
})

server.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`)
})