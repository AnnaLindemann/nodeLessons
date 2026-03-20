import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

const clientSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
  },
  contactPerson: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: /^\+\d \(\d{3}\) \d{3}-\d{4}$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  address: {
    type: addressSchema,
    required: true,
  },
  contractSigned: {
    type: Date,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive", "pending"],
    default: "pending",
  },
});

const Client = mongoose.model("Client", clientSchema);

export default Client;