import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 2,
  },
 articles:[
     {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Article"
     }
   ]

})

const Tag = mongoose.model("Tag", tagSchema)

export default Tag