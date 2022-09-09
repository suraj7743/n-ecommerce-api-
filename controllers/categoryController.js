const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

//requiring categoryModel
const categoryModel = require("../models/category");

const getCategory = catchAsync(async (req, res, next) => {
  const data = await categoryModel.find();
  if (!data) {
    return next(new AppError("Cannot find the category Error...", 400));
  }
  res.status(200).json({
    status: "success",
    message: "All category ",
    data,
  });
});

//post request on category  /category
const postCategory = catchAsync(async (req, res, next) => {
  const { name, icon, color, image } = req.body;
  const saveData = await categoryModel.create({
    name,
    icon,
    color,
    image,
  });
  if (!saveData) {
    return next(new AppError("Error finding category ", 400));
  }
  res.status(400).json({
    status: "success",
    data: saveData,
  });
});

//delete category by id delete request   /category/:id
const deleteCategory = catchAsync(async (req, res, next) => {
  const data = await categoryModel.findByIdAndDelete(req.params.id);
  if (!data) {
    return next(new AppError("Cannot find the category to delete", 400));
  }
  res.status(200).json({
    status: "success",
    data,
    message: "category deleted ",
  });
});

//update category  put -request  /category/:id
const updateCategory = catchAsync(async (req, res, next) => {
  const data = await categoryModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
      image: req.body.image,
    },
    { new: true }
  );
  if (!data) {
    return next(new AppError("Cannot update invalid id ", 400));
  }
  res.status(202).json({
    status: "success",
    data,
    message: "Category updated ",
  });
});
//get request /category/:id
const getCategoryById = catchAsync(async (req, res, next) => {
  const data = await categoryModel.findById(req.params.id);
  if (!data) {
    return next(new AppError("Cannot find the category with given id ", 400));
  }
  res.status(200).json({
    status: "success",
    message: "category with id only ",
    data,
  });
});

module.exports = {
  getCategory,
  postCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
};
