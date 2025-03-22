import express from "express";

import { addAllVideoController, getVideoController } from "../controllers/videoController.js";
const router = express.Router();


// Add a class with a YouTube embed URL
router.post("/add-class",addAllVideoController);

// Get the latest class video
router.get("/classes",getVideoController);
  
  export default router