import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,      
    required: true,
    trim: true,
    lowercase: true,
  },
  courses:[
     {
       type: mongoose.Schema.Types.ObjectId,
       ref: "Course"
     }
   ]

})

const Student = mongoose.model("Student", studentSchema)

export default Student