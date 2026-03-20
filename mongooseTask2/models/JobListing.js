import mongoose from "mongoose";

const jobListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 50,
  },
  requirements: {
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
      message: "Requirements must contain from 1 to 10 items",
    },
  },
  salaryMin: {
    type: Number,
    required: true,
    min: 0,
  },
  salaryMax: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.salaryMin;
      },
      message: "salaryMax must be greater than salaryMin",
    },
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  remote: {
    type: Boolean,
    default: false,
  },
  postedDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value > this.postedDate;
      },
      message: "expiryDate must be greater than postedDate",
    },
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
});

const JobListing = mongoose.model("JobListing", jobListingSchema);

export default JobListing;