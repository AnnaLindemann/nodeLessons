import {Router} from "express";
import { isValidObjectId } from "mongoose";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

const productRouter = Router();

productRouter.post("/", async (req, res) => {
  try{
    const {name, price, category} = req.body;
    if(!name || !price || !category){
  return res.status(400).json({message: "Product's name, price and category required"})
}

if(!isValidObjectId(category)){
  return res.status(400).json({message: "Id is not valid"})
}


const existetCategory = await Category.findOne({_id: category});
if(!existetCategory){
  return res.status(404).json({message: "Category not found"});
}

const newProduct = await Product.create({
  name,
  price,
  category,
})

return res.status(201).json({
  message: "product successfully created",
  data: newProduct,
})

  }catch(error){
    res.status(500).json({message: "Internal error"})
  }
})

productRouter.get("/", async (req, res) => {
  try{
const products = await Product.find().populate(["category"]).exec();

res.status(200).json({products})
  }catch(error){
    res.status(500).json({message: "Internal error"})
  }
})

export default productRouter