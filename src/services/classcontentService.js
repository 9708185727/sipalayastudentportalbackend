import ClassContent from "../models/ClassContent.js";

const addVideo=async ({title,day,batch,videoUrl})=>{
    const newClass = new ClassContent({ title,day,batch, videoUrl });
    return await newClass.save();
}
const getVideo=async ()=>{
const  newClass =await ClassContent.find();

return newClass
   
}
export {addVideo,getVideo}