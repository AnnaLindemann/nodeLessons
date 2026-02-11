const http = require("http")
//import http from "http"

const PORT = 3333;
const host = "127.0.0.1"

const server = http.createServer((requset, responce) => {
  console.log(requset.url);
  responce.statusCode = 200;
  responce.setHeader("Content-Type", "text/plain");
    responce.end("Hello world!");
  })

  server.listen(PORT,host,()=> {
    console.log(`Server running at http://${host}:${PORT}`)
  })