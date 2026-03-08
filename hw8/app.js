import dotenv from "dotenv"
dotenv.config()
import express from "express"
import sequelize from "./config/db.js"
import Book from "./models/Book.js"

const PORT = process.env.PORT
const app = express()

app.use(express.json())

app.get("/books",async (req,res) => {

  try{
 const books =await Book.findAll()
 res.status(200).json(books)
  }catch(error){
   res.status(500).json({message: "Failed to fetch books", error: error.message})
  }
})

app.post("/books", async (req, res) => {
  try{
    const {title, author, year} = req.body
    const newBook = await Book.create({
      title, 
      author,
      year,
    })
    res.status(201).json(newBook)
  } catch(error){
    res.status(500).json({message: "Failed to create book", error: error.message})
  }
})

app.put("/books/:id", async (req, res) => {
  try{
    const {id} = req.params
    const {title, author, year} = req.body
    const [updatedRows] = await Book.update(
      {title, author, year},
      {where: {id}}
    )

    if(updatedRows === 0){
      return res.status(404).json({message: "Book not found"})
    }
    const updatedBook = await Book.findByPk(id)
    res.status(200).json(updatedBook)
  }catch(error){
  res.status(500).json({message: "Failed to update book", error: error.message})
  }
})

app.delete("/books/:id", async (req, res) => {
try { const {id} = req.params
  const deletedRow = await Book.destroy({
    where:{ id }
  })
  if(deletedRow === 0){
    return res.status(404).json({message: "Book not found"})
  }
  res.status(200).json({message: "Book was deleted"})
} catch(error){
  res.status(500).json({message: "Failed to delete book", error: error.message})
} 
})

app.listen(PORT,async () => {
  try{
await sequelize.authenticate()
  console.log("Database is connected ")
  console.log(`Servce running at http://localhost:${PORT}`)
}catch(err){
  console.error("Database is disconnected:", err)
}
})