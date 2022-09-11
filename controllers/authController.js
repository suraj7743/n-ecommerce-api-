const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
//importing usermodel
const usermodel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/*
/register -post 
take data from body 
save data to database 

*/
//post request post  /user/register
const registerUser = catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(new AppError("Input  all field", 400));
  }
  const saveData = await usermodel.create({
    username,
    email,
    password,
  });
  const data = await saveData.save();
  res.status(200).json({
    status: "success",
    data,
  });
});

//post request on login
//post /user/login
const loginUser = catchAsync(async (req, res, next) => {
  const user = await usermodel.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("User Not found with given email ", 400));
  }
  if (user && bcrypt.compare(req.body.password, user.password)) {
    const token = jwt.sign(
      {
        userId: user.id,
      },
      process.env.jwtsecret,
      {
        expiresIn: "3d",
      }
    );
    res.status(200).json({
      status: "success",
      message: "user authenticated ",
      email: user.email,
      token,
    });
  } else {
    return next(new AppError("Password doesnot match ", 400));
  }
});
module.exports = {
  registerUser,
  loginUser,
};
