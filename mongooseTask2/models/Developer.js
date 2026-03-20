import mongoose from "mongoose";

const developerSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  experience: {
    type: Number,
    required: true,
    min: 0,
    max: 50,
  },
  skills: {
    type: [
      {
        type: String,
        trim: true,
      },
    ],
    required: true,
    validate: {
      validator: function (arr) {
        return Array.isArray(arr) && arr.length >= 1 && arr.length <= 10;
      },
      message: "Skills must contain from 1 to 10 items",
    },
  },
  hourlyRate: {
    type: Number,
    required: true,
    min: 10,
    max: 200,
  },
  available: {
    type: Boolean,
    required: true,
    default: true,
  },
  githubProfile: {
    type: String,
    trim: true,
    validate: {
      validator: function (value) {
        if (!value) return true;
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      },
      message: "githubProfile must be a valid URL",
    },
  },
});

const Developer = mongoose.model("Developer", developerSchema);

export default Developer;