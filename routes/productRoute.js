const express = require("express");
const router = express();
const productController = require("../controllers/productController");

router.get("/", productController.getAllProduct);
router.post(
  "/",
  productController.uploadOptions.single("image"),
  productController.postProduct
);
router.put(
  "/:id",
  productController.uploadOptions.single("image"),
  productController.updateProduct
);
router.delete("/:id", productController.deleteProduct);
router.get("/:id", productController.getProductById);
router.get("/get/nameImagePrice", productController.getProductNameImagePrice);
router.get("/get/nameDescription", productController.getProductNameDescription);
router.get("/get/count", productController.getProductAndCount);
module.exports = router;
