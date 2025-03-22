
import Course from "../models/Course.js";
const createCourse = async (data,userId) => {
  return await Course.create({...data, createdBy:userId});
  // await Course.create({
  //   name:data.name,
  //  description:data.description,
  //  price:data.price,
  //  category:data.category,
  //  stock:data.stock,
  // });
  // console.log("Course Added");
};
const getCourse = async (query) => {
  const limit = query?.limit || 10;
  const sort = query?.sort ? JSON.parse(query.sort) : {};
  const filters = query?.filters ? JSON.parse(query.filters) : {};
  const page = query?.page || 1;
  const offset = (page - 1) * limit;

  const customQuery = Object.entries(filters).reduce((acc, [key, value]) => {
    const result = { ...acc, [key]: new RegExp(value, "i") };

    return result;
  }, {});

  return await Course.find(customQuery).limit(limit).sort(sort).skip(offset);
};
const getCourseById = async (id) => {
  return await Course.findById(id);
};
const getFaculties=async ()=>{
 return await Course.distinct("faculty")
}
const updateCourseById = async (id, data) => {
  return await Course.findByIdAndUpdate(id, data);
};
const deleteCourseById = async (id) => {
  return await Course.findByIdAndDelete(id);
};

const getTotalCourses=async ()=>{
  return await Course.countDocuments();
}
export default {
  createCourse,
  getCourse,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  getFaculties,
  getTotalCourses,
};
