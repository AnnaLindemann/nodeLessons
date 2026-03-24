import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
name: {
  type: String,
  required: true,
  minLength: 2,
},
price:{
  type: Number,
  required: true,
},
category: {
  type: String,
   required: true,
   minLength: 2,
}
},
{
  timestamps: true
})

const Product = mongoose.model("Product", productSchema)

export default Product