import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
    maxlength: 50,
  },
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    match: /^[A-Z]{3}\d{3}$/,
  },
  budget: {
    type: Number,
    required: true,
    min: 1000,
    max: 1000000,
  },
  established: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value <= new Date();
      },
      message: "Established date cannot be in the future",
    },
  },
});

const Department = mongoose.model("Department", departmentSchema);

export default Department;