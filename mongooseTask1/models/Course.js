import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
    minlength: 2,
    trim:true,
  },
  description: {
    type: String,      
    maxlength:200,
  },
  students:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    }
  ]

})

const Course = mongoose.model("Course", courseSchema)

export default Course