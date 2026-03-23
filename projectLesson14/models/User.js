import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
  },
email:{
  type: String,
  required: true,
  unique: true,
    trim: true,
    lowercase: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
},
passwordHash: {
  type: String,
  required: true,
},
},
{
  timestamps: true
}
)

const User = mongoose.model("User", userSchema);

export default User;