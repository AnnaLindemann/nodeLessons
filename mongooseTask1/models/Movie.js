import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    minlength: 2,
    trim: true,
  },
  releaseYear: {
    type: Number,      
    required: true,
      },
  actors:[
     {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Actor"
     }
   ]

})

const Movie = mongoose.model("Movie", movieSchema)

export default Movie