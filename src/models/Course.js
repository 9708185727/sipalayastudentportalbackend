import mongoose from "mongoose";
const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  schedule:{
    type:String,
    required:true,
  },
  faculty: String,
  price: { type: Number, required: true, min: 0 },
  description: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy: {
    type:mongoose.Schema.Types.ObjectId ,
    ref:"User",
    required:true,
  },
});
export default mongoose.model("Course", courseSchema);
