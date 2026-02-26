import http from "http"
import fs from "fs"
import { error } from "console"

const port = 3333

const server = http.createServer((req,res) => {
try{
throw new Error("Test error")
}catch(err){
  const message = err.message
  fs.appendFile("errors.log", message,"utf-8",(error) => {
      if (error) {
        console.log("Error writing file")
      }
      })
res.statusCode = 500
res.setHeader("Content-Type", "text/plain")
res.end("Internal Server Error")
}
})

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})