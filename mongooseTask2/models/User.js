import mongoose from "mongoose";

const phoneRegex = /^\+\d{3}\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  age: {
    type: Number,
    required: true,
    min: 13,
    max: 120,
  },
  phone: {
    type: String,
    trim: true,
    validate: {
      validator: function (value) {
        if (!value) return true; // поле optional
        return phoneRegex.test(value);
      },
      message: "Invalid phone format",
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;