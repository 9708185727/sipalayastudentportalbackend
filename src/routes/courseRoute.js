import express from "express";
import auth from "../middlewares/auth.js";
import {addCourse, getAllCourses, getCourseById, updateCourse,deleteCourse, getAllFaculties, getTotalSumCourse} from "../controllers/courseController.js";
import roleBaseAuth from "../middlewares/roleBasedAuth.js";
const router = express.Router();


router.get("/",getAllCourses );
router.get("/faculties",getAllFaculties );
router.get("/total",getTotalSumCourse );
router.get("/:id",getCourseById);
router.post("/",auth,addCourse);
router.put("/:id",auth,updateCourse);
router.delete("/:id",[auth,roleBaseAuth("ADMIN")],deleteCourse);
export default router;
