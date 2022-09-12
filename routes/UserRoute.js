const express = require("express");
const router = express();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.get("/", userController.getAlluser);
router.get("/:id", userController.getSingleUser);

module.exports = router;
