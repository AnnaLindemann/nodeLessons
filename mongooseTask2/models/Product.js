import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  sku: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[A-Za-z]{3}\d{5}$/,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  finalPrice: {
    type: Number,
    min: 0,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductCategory",
    required: true,
  },
  specifications: {
    type: Map,
    of: String,
    required: true,
    validate: {
      validator: function (value) {
        return value instanceof Map && value.size >= 1;
      },
      message: "Specifications must contain at least 1 key-value pair",
    },
  },
});

function calculateFinalPrice(price, discount) {
  return Number((price - (price * discount) / 100).toFixed(2));
}

productSchema.pre("validate", function (next) {
  if (typeof this.price === "number") {
    const discount = typeof this.discount === "number" ? this.discount : 0;
    this.finalPrice = calculateFinalPrice(this.price, discount);
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;