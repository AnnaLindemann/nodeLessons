import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0.01,
    },
    totalPrice: {
      type: Number,
      min: 0.01,
    },
  },
  { _id: false }
);

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^\+\d \(\d{3}\) \d{3}-\d{4}$/,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^ORD-\d{8}-\d{6}$/,
  },
  customer: {
    type: customerSchema,
    required: true,
  },
  items: {
    type: [itemSchema],
    required: true,
    validate: {
      validator: function (arr) {
        return Array.isArray(arr) && arr.length >= 1;
      },
      message: "Order must contain at least 1 item",
    },
  },
  subtotal: {
    type: Number,
    required: true,
    min: 0.01,
  },
  tax: {
    type: Number,
    required: true,
    min: 0,
  },
  total: {
    type: Number,
    required: true,
    min: 0.01,
  },
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
});

orderSchema.pre("validate", function (next) {
  let subtotal = 0;

  this.items.forEach((item) => {
    item.totalPrice = Number((item.quantity * item.unitPrice).toFixed(2));
    subtotal += item.totalPrice;
  });

  this.subtotal = Number(subtotal.toFixed(2));
  this.total = Number((this.subtotal + this.tax).toFixed(2));

  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;