const express = require("express");
const router = express();

//importing category model
const categoryControllers = require("../controllers/categoryController");

//initializing route
router.get("/", categoryControllers.getCategory);
router.post("/", categoryControllers.postCategory);
router.put("/:id", categoryControllers.updateCategory);
router.delete("/:id", categoryControllers.deleteCategory);
router.get("/:id", categoryControllers.getCategoryById);

module.exports = router;
