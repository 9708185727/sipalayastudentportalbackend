import { addVideo, getVideo } from "../services/classcontentService.js";

const addAllVideoController=async (req, res) => {
    try {
      const { title,day,batch, videoUrl } = req.body;
  
      // Ensure it's an embed URL (optional validation)
      if (!videoUrl.includes("youtube.com/embed/")) {
        return res.status(400).json({ message: "Invalid YouTube embed URL" });
      }
  
      const newClass =await addVideo({title,day,batch,videoUrl})
      res.status(201).json({ message: "Class added successfully!", newClass });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  }
  const getVideoController=async (req, res) => {
    try {
      const classData = await getVideo() // Get one video for now
      if (!classData) return res.status(404).json({ message: "No class found" });
  
      res.status(200).json(classData);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  

  }
  export {addAllVideoController,getVideoController}