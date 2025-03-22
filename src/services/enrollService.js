import Course from "../models/Course";
import Enrollment from "../models/Enrollment";
import User from "../models/User";

const createEnroll=async({studentId,courseId,adminId})=>{

    const admin = await User.findById(adminId);
    if (!admin || admin.roles !== "ADMIN") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }
// Find student and course
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
        return  await newEnrollment.save();

   
}
export {createEnroll}