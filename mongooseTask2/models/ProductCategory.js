import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[a-z-]+$/,
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  displayOrder: {
    type: Number,
    required: true,
    min: 1,
    max: 999,
  },
});

productCategorySchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await mongoose.model("Product").deleteMany({ category: doc._id });
  }
});

const ProductCategory = mongoose.model("ProductCategory", productCategorySchema);

export default ProductCategory;