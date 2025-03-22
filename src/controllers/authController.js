import { createAuthToken } from "../helpers/authHelpers.js";
import userService from "../services/authService.js";

const userRegister = async (req, res) => {
  const userData = req.body;
  console.log(userData);
  console.log(req.file);
  
  const image = req.file ? `./uploads/${req.file.filename}` : "";

  // console.log(image);

  if (!userData.name) return res.status(422).send("required data name");
  if (!userData.batch) return res.status(422).send("required data batch");
  // if (!image) return res.status(422).send("required data image file");
  if (!userData.phone) return res.status(422).send("required data phone");
  if (!userData.email) return res.status(422).send("required data email");
  if (!userData.password) return res.status(422).send("required data password");
  if (userData.password !== userData.confirmPassword) {
    return res.status(400).send("password and confirm password does not match");
  }
  if (userData.password.length < 8) {
    return res.status(400).send("password must be greater than 8");
  }
  const data = {
    name: userData.name,
    phone: userData.phone,
    image: image,  // Correct usage
    batch: userData.batch,
    email: userData.email,
    password: userData.password,
    confirmPassword: userData.name,  // Check if you meant to use "name" here for confirmation
  };

  try {
    const userAdd = await userService.userCreate(data);
    console.log(userAdd);
    const token = createAuthToken(userAdd);
    res.status(201).json({ ...userAdd, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const userLog = async (req, res) => {
  const userData = req.body;
  try {
    const user = await userService.userLogin(userData);
    const token = createAuthToken(user);
    // console.log(authToken);
    res.cookie("authToken", token, { httpOnly: true });
    //  localStorage.setItem('key',data);//use in local browser stroage for large storage
    res.status(201).json({ ...user, token });
    // res.send("user login successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const ForgotPassword = async (req, res) => {
  const userData = req.body;
  try {
    const user = await userService.sendResetPasswordLink(userData);
 
    //  localStorage.setItem('key',data);//use in local browser stroage for large storage
    res.status(201).json({...user});
    // res.send("user login successfully");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
const ResetPassword = async (req, res) => {
  const {token,password}= req.body;
  if(!token,!password){
    return res.status(400).json({sccuess:false,message:"password is requred"})
  }
  try {
    const data= await userService.ResetPassword(token,password);
      res.status(201).json({...data});
 
  } catch (error) {
    res.status(500).send(error.message);
  }
};
  const logout = async (req, res) => {
     res.clearCookie("authToken");
      res.json({
        status:"OK",
      })
};
const getAllUser = async (req, res) => {
  try {
    const getData = await userService.getUser(req.query);
    res.status(201).json(getData);
    console.log(req.query)
  } catch (error) {
    res.status(400).send(error.message);
  }
  // res.json(products)
};

export { userRegister, userLog, logout,getAllUser,ForgotPassword,ResetPassword};
