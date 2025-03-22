import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userCreate = async (data) => {
  const userExists = await User.findOne({ email: data.email });
  if (userExists) throw new Error("User Email already exists");
  const hashpassword = bcrypt.hashSync(data.password);
  try {
    return await User.create({
      name: data.name,
      batch: data.batch,
      image:data.image,

      phone: data.phone,
      email: data.email,
      
      password: hashpassword,
      roles: data.roles,
    });
  } catch (error) {
    console.log(error.message);
  }
};

const userLogin = async (data) => {
  const userExisting = await User.findOne({ phone: data.phone });

  if (!userExisting) throw new Error("user not exists");
  const isMatch = bcrypt.compareSync(data.password, userExisting.password);

  if (!isMatch) {
    throw Error("Password  does not Match");
  }

  return userExisting;
};
const sendResetPasswordLink = async (data) => {
  try {
    const userExisting = await User.findOne({ email: data.email });

    const resetToken = jwt.sign(
      { id: userExisting.id, email: userExisting.email },
      process.env.JWT_SECRET_RESET,
      { expiresIn: "10m" }
    );
    const ResetLink = `${process.env.APP_URL}/reset-password?token=${resetToken}`;
    // console.log(ResetLink);
    return {
      success: true,
      message: "reset link send successfully",
      ResetLink,
    };
  } catch (error) {
    console.log(error);
    return { success: false, message: "error link send failed" };
  }
};
const ResetPassword = async (token, password) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_RESET);

    // Hash password with proper salt rounds
    const hashpassword = await bcrypt.hash(password, 10);

    // Correct usage of findByIdAndUpdate
    const updatedPassword = await User.findByIdAndUpdate(
      decoded.id,
      { password: hashpassword },
      { new: true } // Ensure it returns the updated user
    );

    if (!updatedPassword) {
      return { success: false, message: "User not found" };
    }

    console.log("Password reset successful");
    return { success: true, message: "Password reset successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Error during password reset" };
  }
};

const getUser = async (query) => {
  const limit = query?.limit || 10;
  const sort = query?.sort ? JSON.parse(query.sort) : {};
  const filters = query?.filters ? JSON.parse(query.filters) : {};
  const page = query?.page || 1;
  const offset = (page - 1) * limit;
  const customQuery = Object.entries(filters).reduce((acc, [key, value]) => {
    const result = { ...acc, [key]: new RegExp(value, "i") };

    return result;
  }, {});

  return await User.find(customQuery).limit(limit).sort(sort).skip(offset);
};

export default {
  userCreate,
  userLogin,
  getUser,
  sendResetPasswordLink,
  ResetPassword,
};
