import express from "express"
import dotenv from "dotenv"
import dbConnection from "./db/db.js"
dotenv.config()

const port = process.env.PORT || 3000
const app = express()

app.use(express.json())

app.get("/",(_req,res) => {
  res.send("Hello World!")
})

app.post("/",(req,res, next) => {
  try{
const{text} = req.body 
if(typeof text !== "string" || text.trim().length === 0){
  const err = new Error("Text is required and must be string")
    err.status = 400
    return next(err)  
}
return res.status(200).json({text})
  }catch(err){
  return next(err)
  }
})

app.get("/products", (req,res, next) => {
  console.log("requesting products via '/products' ")
const getAllProducts = `SELECT * FROM products`

dbConnection.query(getAllProducts, (err,data) => {
if(err){
  next(err)
  return
}
res.json(data)
})
})

app.post("/products", (req,res, next) => {
  const { name, price} = req.body
  const query = `INSERT INTO products (name, price) VALUES (?,?)`

  dbConnection.query(query, [name, price], (err,data) => {
    if(err){
     next(err)
      return;
    }
    res.status(201).send("Products was registred successfully");
  })
})

app.use((_req,_res,next) => {
  const err = new Error("Route not found")
  err.status = 404
  next(err)
})

app.use((err,_req,res,_next) => {
  console.log(err)
  res.status(err.status || 500).json({message: err.message}) 
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
})