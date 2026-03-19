import mongoose from "mongoose";

const authorSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    
  }
})

const Author = mongoose.Schema.model("Author", authorSchema)
export default Author