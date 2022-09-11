const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const usermodel = require("../models/users");

//get all user get request /user/
const getAlluser = catchAsync(async (req, res, next) => {
  const user = await usermodel.find().select("-password");
  if (!user) {
    return next(new AppError("Cannot find user ", 400));
  }
  res.status(200).json({
    status: "success",
    result: user.length,
    data: user,
  });
});

//get single user with id:
//get request /users/:id
const getSingleUser = catchAsync(async (req, res, next) => {
  const user = await usermodel.findById(req.params.id).select("-password");
  if (!user) {
    return next(new AppError("Invalid user id ", 400));
  }
  res.status(200).json({
    status: "success",
    data: user,
  });
});
module.exports = {
  getAlluser,
  getSingleUser,
};
