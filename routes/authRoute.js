const express = require("express");
const router = express();

//importing auth controller
const authController = require("../controllers/authController");
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);

//exporting router
module.exports = router;
