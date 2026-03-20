import mongoose from "mongoose";


const departmentSchema = new mongoose.Schema({
name: {
  type: String,
  required: true,
  minlength: 2,
  maxlength: 50,
},
code:{
  type: String,
  required: true,
  unique: true,
  
}





})

const Department = mongoose.model("Department", departmentSchema)

export default Department