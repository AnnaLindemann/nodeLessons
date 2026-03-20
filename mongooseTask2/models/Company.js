import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 2,
  },
  taxId: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{10,12}$/,
  },
  industry: {
    type: String,
    required: true,
    enum: ["IT", "Finance", "Healthcare", "Education", "Retail"],
  },
  employeeCount: {
    type: Number,
    required: true,
    min: 1,
  },
  website: {
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
      message: "Website must be a valid URL",
    },
  },
});

const Company = mongoose.model("Company", companySchema);

export default Company;