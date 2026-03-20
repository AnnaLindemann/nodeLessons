import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 20,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: {
    type: Number,
    required: true,
    min: 1,
  },
  category: {
    type: String,
    required: true,
    enum: ["consulting", "development", "support", "training"],
  },
  level: {
    type: String,
    required: true,
    enum: ["basic", "premium", "enterprise"],
  },
  active: {
    type: Boolean,
    required: true,
    default: true,
  },
  clients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
    },
  ],
});

const Service = mongoose.model("Service", serviceSchema);

export default Service;