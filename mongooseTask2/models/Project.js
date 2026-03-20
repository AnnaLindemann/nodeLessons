import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    validate: {
      validator: function (value) {
        if (!value) return true;
        return value > this.startDate;
      },
      message: "endDate must be greater than startDate",
    },
  },
  budget: {
    type: Number,
    required: true,
    min: 1000,
  },
  status: {
    type: String,
    required: true,
    enum: ["planning", "active", "completed", "cancelled"],
  },
  technologies: {
    type: [
      {
        type: String,
        trim: true,
      },
    ],
    required: true,
    validate: {
      validator: function (arr) {
        return Array.isArray(arr) && arr.length >= 1;
      },
      message: "Technologies must contain at least 1 item",
    },
  },
  developers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Developer",
    },
  ],
});

const Project = mongoose.model("Project", projectSchema);

export default Project;