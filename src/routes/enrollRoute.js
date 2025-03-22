import express from "express";
import { addStudent } from "../controllers/enrollController";
const router = express.Router();


// Admin assigns a student to a course
router.post("/enroll",addStudent );



// Admin enrolls a student in a course
router.post("/enroll", async (req, res) => {
  try {
    const { studentId, courseId, adminId } = req.body;

    // Check if the user is an admin
    const admin = await User.findById(adminId);
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    // Check if the student and course exist
    const student = await User.findById(studentId);
    const course = await Course.findById(courseId);
    if (!student || !course) {
      return res.status(404).json({ message: "Student or Course not found." });
    }

    // Check if the student is already enrolled
    const existingEnrollment = await Enrollment.findOne({ student: studentId, course: courseId });
    if (existingEnrollment) {
      return res.status(400).json({ message: "Student is already enrolled in this course." });
    }

    // Enroll the student
    const newEnrollment = new Enrollment({ student: studentId, course: courseId });
    await newEnrollment.save();

    res.status(201).json({ message: "Student enrolled successfully!", enrollment: newEnrollment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
