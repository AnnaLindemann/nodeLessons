import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  content: {
    type: String,      
    maxlength: 200,
      },
  tags:[
     {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Tag"
     }
   ]

})

const Article = mongoose.model("Article", articleSchema)

export default Article