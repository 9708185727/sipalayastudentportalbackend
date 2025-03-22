import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  title: { type: String, required: true },
  day:{type:Number,required:true},
  batch:{type:String,required:true},
  videoUrl: { type: String, required: true }, // Store YouTube embed URL
});

export default mongoose.model("ClassContent", classSchema);

