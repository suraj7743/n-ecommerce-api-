const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

//importing usermodel
const usermodel = require("../models/users");

/*
/register -post 
take data from body 
save data to database 

*/

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
module.exports = {
  registerUser,
};
