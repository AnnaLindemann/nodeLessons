import { Router } from "express";
import Category from "../models/Category.js";

const categoryRoute = Router();


categoryRoute.post("/", async (req, res) => {
try {  
  const {name} = req.body;
if(!name){
  return res.status(400).json({message: "Category's name required"})
}

const newCategory = await Category.create({
  name,
})

return res.status(201).json({
  message: "Category successfully created",
  data: newCategory,
});

} catch (error){
  res.status(500).json({message: "Internal error"})
}

})

export default categoryRoute;