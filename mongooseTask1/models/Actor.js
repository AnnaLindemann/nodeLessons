import mongoose from "mongoose";

const actorSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  birthdate: {
    type: Date,      
    required: true,
      },
  movies:[
     {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Movie"
     }
   ]

})

const Actor = mongoose.model("Actor", actorSchema)

export default Actor