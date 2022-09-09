const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const productModel = require("../models/products");
const categoryModel = require("../models/category");

//get all product items get request -- /prouduct
const getAllProduct = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }
  const data = await productModel.find(filter).populate("category");
  if (!data) {
    return next(new AppError("Cannot find all product Error occured ", 400));
  }
  res.status(200).json({
    status: "success",
    message: "all Product data ",
    data,
  });
});

//post request on product item
// post request --/product
const postProduct = catchAsync(async (req, res, next) => {
  const categorydata = await categoryModel.findById(req.body.category);
  if (!categorydata) {
    return next(new AppError("Invalid Category ", 400));
  }

  const {
    name,
    description,
    richDescription,
    image,
    images,
    brand,
    price,
    category,
    countInStock,
    rating,
    isFeatured,
  } = req.bdy;
  const data = await productModel.create({
    name,
    description,
    richDescription,
    image,
    images,
    brand,
    price,
    category,
    countInStock,
    rating,
    isFeatured,
  });
  if (!data) {
    return next(new AppError("Cannot find the data for the prooduct ", 400));
  }
  res.status(200).json({
    status: "success",
    message: "data Posted",
    data,
  });
});

//update producct by id  put request /product/:id
const updateProduct = catchAsync(async (req, res, next) => {
  const categoryData = await categoryModel.findById(req.body.category);
  if (!categoryData) {
    return next(
      new AppError("Cannot find the category id cannot update ", 400)
    );
  }

  const {
    name,
    description,
    richDescription,
    image,
    images,
    brand,
    price,
    category,
    countInStock,
    rating,
    isFeatured,
  } = req.bdy;
  const data = await productModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      richDescription,
      image,
      images,
      brand,
      price,
      category,
      countInStock,
      rating,
      isFeatured,
    },
    { new: true }
  );
  if (!data) {
    return next(new AppError("Cannot update invalid product  id ", 400));
  }
  res.status(202).json({
    status: "success",
    data,
    message: "Product updated ",
  });
});

//delete product by id
// delete request /product/:id
const deleteProduct = catchAsync(async (req, res, next) => {
  const data = await productModel.findByIdAndDelete(req.params.id);
  if (!data) {
    return next(new AppError("Cannot find the id to delete the product ", 400));
  }
  res.status(200).json({
    status: "success",
    message: "product Deleted",
    data,
  });
});

//get product by id
//get request--/product/:id
const getProductById = catchAsync(async (req, res, next) => {
  const data = await productModel.findById(req.params.id).populate();
  if (!data) {
    return next(new AppError("cannot find the product with given id ", 400));
  }
  res.status(200).json({
    status: "success",
    message: "Product with id ",
    data,
  });
});
//get product name image and price only
const getProductNameImagePrice = catchAsync(async (req, res, next) => {
  const data = await productModel.find().select("name image price -_id");
  if (!data) {
    return next(new AppError("Error occured during getting item", 500));
  }
  res.status(200).json({
    status: "success",
    data,
  });
});
//get product name description only

const getProductNameDescription = catchAsync(async (req, res, next) => {
  const data = await productModel.find().select("name description -_id");
  if (!data) {
    return next(new AppError("Error occured during getting item", 500));
  }
  res.status(200).json({
    status: "success",
    data,
  });
});

//get product and count total product
// /get/count
const getProductAndCount = catchAsync(async (req, res, next) => {
  const data = await productModel.find().countDocuments((count) => count);
  if (!data) {
    return next(new AppError("Not found valid count item ", 500));
  }
  res.status(200).json({
    status: "success",
    count: data,
  });
});

//getfeatured
///product/get/featured
const getFeaturedProduct = catchAsync(async (req, res, next) => {
  const data = await productModel.find({ isFeatured: true });
  if (!data) {
    return next(new AppError("Cannot find featured product ", 400));
  }
  res.status(200).json({
    status: "success",
    message: "featured product ",
    data,
  });
});

//get featured product and count
const getFeaturedCount = catchAsync(async (req, res, next) => {
  const count = req.params.count ? req.params.count : 0;
  const data = await productModel.find({ isFeatured: true }).limit(+count);
  if (!data) {
    return next(new AppError("Cannot find featured count proudct ", 400));
  }
  res.status(200).json({
    status: "success",
    message: `Featured product with ${count}count `,
    data,
  });
});

module.exports = {
  getAllProduct,
  postProduct,
  updateProduct,
  deleteProduct,
  getProductById,
  getProductNameImagePrice,
  getProductNameDescription,
  getProductAndCount,
  getFeaturedProduct,
  getFeaturedCount,
};
