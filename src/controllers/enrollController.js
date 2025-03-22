
import { createEnroll } from "../services/enrollService";

const addStudent=async (req, res) => {
    try {
        const { studentId, courseId, adminId } = req.body;
   const newEnrollment=  await createEnroll({studentId,courseId,adminId})
   res.status(201).json({ message: "Student enrolled successfully!", enrollment: newEnrollment });
   
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  export {addStudent}