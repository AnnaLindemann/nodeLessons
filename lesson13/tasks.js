import dotenv from "dotenv"
dotenv.config()
import express from "express"
import { connectToDatabase, getDb } from "./db.js"
import { ObjectId } from "mongodb";

const uri = process.env.MONGO_URI;
const PORT = process.env.PORT || 3333
const app = express()
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Project run")
})
//POST
app.post("/products", async (req, res) => {
 try { const db = getDb()
  
  const product  = req.body
if(!product.name || !product.price || !product.description){
  return res.status(400).json({message: "All fields are required"})
}

const newProduct = await db.collection("products").insertOne(product)
res.status(201).json({message: "Product successfully added",data: newProduct})
} catch(error){
  res.status(500).json({ error: "Failed to create product" })
}
})
//GET/products
app.get("/products", async (req, res) => {
 try{ const db = getDb()
  const products = await db.collection("products").find().toArray()
  return res.status(200).json({data: products,})
}catch(error){
return res.status(500).json({ error: "Internal error" })
}
})
//GET/products/:id
app.get("/products/:id", async (req, res) => {
  try{
    const db = getDb()
    const {id} = req.params
if(!ObjectId.isValid(id)){
  return res.status(400).json({ message: "Invalid note id" })
}

const product = await db.collection("products").findOne({_id: new ObjectId(id)})

if (!product) {
  return res.status(404).json({ message: "Product not found" })
}
  return res.status(200).json({data: product })
  } catch(error){
    return res.status(500).json({ error: "Internal error" })
  }
})
//PUT/products/:id
app.put("/products/:id", async (req, res) => {
try {  const db = getDb()

  const {id} = req.params
  const updatedProduct = req.body
  if(!ObjectId.isValid(id)){
    return res.status(400).json({ message: "Invalid note id" })
  }

if(!updatedProduct.name || !updatedProduct.price || !updatedProduct.description){
  return res.status(400).json({message: "Title and text are required"})
}

const result = await db.collection("products").updateOne(
  {_id: new ObjectId(id)},
 {$set:{
name: updatedProduct.name,
 price: updatedProduct.price,
 description: updatedProduct.description 
}  
})
if (result.matchedCount === 0) {
  return res.status(404).json({ message: "Product not found" })
}

return res.status(200).json({message: "product successfully updated", data: result})

} catch(error){
  return res.status(500).json({message:"Server error"})
}
})

//DELETE/products:id
app.delete("/products/:id", async (req, res) => {
  try{const db = getDb()
  const {id} = req.params
  if(!ObjectId.isValid(id)){
    return res.status(400).json({ message: "Invalid note id" })
  }

  const result = await db.collection("products").deleteOne({_id:  new ObjectId(id)})

    if (result.deletedCount === 0) {
  return res.status(404).json({ message: "Product not found" });
}

  res.status(200).json({message:"Product was deleted"})
  } catch(error){
 return res.status(500).json({message:"Server error"})
  }
})


connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server because MongoDB connection failed", error);
  });

