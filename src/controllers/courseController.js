
import CourseService from "../services/courseService.js";

const getAllCourses = async (req, res) => {
  try {
    const getData = await CourseService.getCourse(req.query);
    res.status(201).json(getData);
    console.log(req.query)
  } catch (error) {
    res.status(400).send(error.message);
  }

};

const getCourseById = async (req, res) => {
  // console.log(req.query);
  console.log(req.params.id);

  const id = req.params.id;
  try {
    const Course = await CourseService.getCourseById(id);
    if (!Course) res.status(404).send("Course not found");

    res.json(Course);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const addCourse = async (req, res) => {
  // console.log(req.body);

  const data = req.body;
  const userId = req.user._id;

  if (!data.name) return res.status(422).send("Course name is required ");
  if (!data.price) return res.status(422).send("Course price is required ");
  if (!data.schedule) return res.status(422).send("schedule is required ");
  try {
    const createdCourse = await CourseService.createCourse(data, userId);
    res.status(201).json(createdCourse);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
const updateCourse = async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const user = req.user;
  try {
    const Course = await CourseService.getCourseById(id);
    if (!Course) return res.status(404).send("Course not Found");
    if (Course.createdBy !=user._id&& !user.roles.includes("ADMIN")) {
      return res.status(404).send("Access Denied");
    }
    const updatedCourse = await CourseService.updateCourseById(id, data);
    res.status(201).json(updatedCourse);
    
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const deleteCourse = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedCourse = await CourseService.deleteCourseById(id);
    res.send(`Course deleted with id ${id} successfully`);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const getAllFaculties = async (req, res) => {
  try {
    const categories= await CourseService.getFaculties();
    res.status(201).json(categories);
  } catch (error) {
    res.status(400).send(error.message);
  }
  
};
const getTotalSumCourse = async (req, res) => {
  try {
    const totalCourse= await CourseService.getTotalCourses();
    res.status(201).json(totalCourse);
  } catch (error) {
    res.status(500).send(error.message);
  }
  
};
export {
  getAllCourses,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
  getAllFaculties,
  getTotalSumCourse,
};
