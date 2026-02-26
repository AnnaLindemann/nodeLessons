import http from "http"
const PORT = 3334
const server = http.createServer((req,res) => {
   res.statusCode = 200
  res.setHeader("Contant-Type","text/plain")

if(req.method === "GET"){
 if(req.url === "/"){
    res.end("Main Page")
  }
else if(req.url === "/about"){
     res.end("About us")
  }
else if(req.url === "/contacts"){
  res.end("Contacts")
} else{
  res.statusCode = 400
  res.end("Page not found")
}
}else if (req.method === "POST") {
    if (req.url === "/submit") {
      req.end("Form submitted!");
    } else {
      res.statusCode = 404;
      res.end("Page not found");
    }
  } else {
    res.statusCode = 405;
    res.end("Method not allowed");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`)
})