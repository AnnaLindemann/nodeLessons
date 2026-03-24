import { application, Router } from "express";
import Product from "../models/Product.js";
import { isValidObjectId } from "mongoose";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
 try{ 
  const products = await Product.find().sort({name: -1}).exec()
   res.status(200).json({products})
} catch(err){
  res.status(400).json({message: "Failed to fetch products"})
}

})


productRouter.post("/", async (req, res) => {
 try { const productData = req.body
  if(!productData){
    return res.status(400).json({message: "All fields are required"})
  }

  const newProduct = await Product.create(productData)
  res.status(201).json({message: "Product successfully created", data: newProduct})
} catch(err){
  res.status(400).json({ error: "Failed to create product" });
}
})



productRouter.put("/:id", async (req,res) => {
 try { 
  const id = req.params.id

  if(!isValidObjectId(id)){
    return res.status(400).json({message: "Id not valid"})
  }
  const productData = req.body
    if(!productData){
    return res.status(400).json({message: "All fields are required"})
  }

  const product = await Product.findByIdAndUpdate(id, productData, {
    new: true,
    runValidators: true,
  })
if(!product){
  return res.status(404).json({ error: "Product not found" });
}
  res.status(200).json({message: "Product successfully updated", data: product})
  
 
} catch(err){
  res.status(400).json({ error: "Failed to update product" });
}
  

})


productRouter.delete("/:id", async (req, res) => {
 try{ 
    const id = req.params.id

  if(!isValidObjectId(id)){
    return res.status(400).json({message: "Id not valid"})
  }

  const deletedProduct = await Product.findOneAndDelete({_id: id} )
  if(deletedProduct === null){
     return res.status(404).json({ error: "Product not found" });
  }
  
  res.status(200).json({ message: "Product deleted" });

 } catch(err){
   res.status(400).json({ error: "Failed to delete product" });
 }
})


export default productRouter;