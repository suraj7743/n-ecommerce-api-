const express = require("express");
const router = express();
const productController = require("../controllers/productController");
const authController = require("../controllers/authController");

router.get(
  "/",
  authController.protectMiddleware,
  productController.getAllProduct
);
router.post(
  "/",
  authController.protectMiddleware,
  productController.uploadOptions.single("image"),
  productController.postProduct
);
router.put(
  "/:id",
  authController.protectMiddleware,
  productController.uploadOptions.single("image"),
  productController.updateProduct
);
router.delete(
  "/:id",
  authController.protectMiddleware,
  productController.deleteProduct
);
router.get(
  "/:id",
  authController.protectMiddleware,
  productController.getProductById
);
router.get(
  "/get/nameImagePrice",
  authController.protectMiddleware,
  productController.getProductNameImagePrice
);
router.get(
  "/get/nameDescription",
  authController.protectMiddleware,
  productController.getProductNameDescription
);
router.get(
  "/get/count",
  authController.protectMiddleware,
  productController.getProductAndCount
);
module.exports = router;
